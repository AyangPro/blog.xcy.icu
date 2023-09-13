import{_ as n,W as s,X as e,Y as a,Z as i,a0 as d}from"./framework-91490e6a.js";const l={},r=i("p",null,"MySQL中NULL与N/A",-1),t=d(`<h1 id="mysql中null与n-a" tabindex="-1"><a class="header-anchor" href="#mysql中null与n-a" aria-hidden="true">#</a> MySQL中NULL与N/A</h1><p>今天工作时遇到一个很有趣的事。</p><p>事情是这样的，我创建了一个VO类作为响应对象用来给前端做响应，大概长这样</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MerchantDataOverviewVo</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">Integer</span> orderNum<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> todayEarnings<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">Integer</span> orderTotal<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">BigDecimal</span> earningsTotal<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">Integer</span> auditNum<span class="token punctuation">;</span>

	<span class="token keyword">private</span> <span class="token class-name">Integer</span> noticeNum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在与前端对接口时，前端说这个接口返回的数据是个空对象，就是在result对象中什么也没有，这时我就纳了闷了，感觉很是奇怪，之后排查完，发现是sql语句的问题。</p><p>这里只放出主要的sql代码了</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT
    ord.sell_user_id,
    COUNT( ord.id ) AS orderNum,
    SUM( ord.actual_price ) AS todayEarnings
FROM
    ucenter_business_order ord
        JOIN merchant_store_info store ON store.id = ord.sell_user_id
WHERE
    store.merchant_id = #{merchantId}
  AND ord.update_time BETWEEN #{today} AND now()
  AND ord.payment_status = 20
GROUP BY
    ord.sell_user_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码看起来仿佛没有问题，但是执行之后得到的结果是N/A，而不是NULL（数据库中是没有符合条件的数据的）。我所期望的结果是数据库中没有数据时，查询出的数据显示为NULL或者0，但是这个sql执行的结果是N/A。</p><p>之后我将分组条件去掉之后，得到的结果是正常的0和NULL，但是加上分组之后就不行了，这时我怀疑是因为符合条件的数据中没有sell_user_id导致的，但是不管有没有符合的数据，必须让此sql返回NULL或者0，不然前端取到的数据是个空对象...</p><p>最后的解决方案是这样的，（这里只放出部分sql代码）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT
    IFNULL( max( today.orderNum ), 0 ) AS orderNum,
    IFNULL( max( today.todayEarnings ), 0 ) AS todayEarnings,
FROM
    (
        SELECT
            ord.sell_user_id,
            COUNT( ord.id ) AS orderNum,
            SUM( ord.actual_price ) AS todayEarnings
        FROM
            ucenter_business_order ord
                JOIN merchant_store_info store ON store.id = ord.sell_user_id
        WHERE
            store.merchant_id = #{merchantId}
          AND ord.update_time BETWEEN #{today} AND now()
          AND ord.payment_status = 20
        GROUP BY
            ord.sell_user_id
    )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到orderNum和todayEarnings之后，数据是正常，但是通过sell_user_id分组之后数据就变为N/A了，所以最后取到的结果是N/A，我们可以将N/A通过max()或者min()函数将N/A转为NULL，然后在通过IFNULL()函数将NULL转为0。</p><p>在数据库中空值可能有三种</p><ul><li>第一种是空字符串</li><li>第二种是NULL</li><li>第三种就是N/A</li></ul><p>N/A比较特殊，前两种其实数据是存在的，就是说无论是空字符串还是NULL，在磁盘上都是占有空间的，但是N/A是不占空间的。</p><p>通俗点说就是NULL和空字符串的数据是存在的，而N/A是不存在的。</p><p>假设现在有一张表长这样</p><table><thead><tr><th>id</th><th>name</th><th>age</th></tr></thead><tbody><tr><td>1</td><td>张三</td><td>18</td></tr><tr><td>2</td><td>(NULL)</td><td>20</td></tr><tr><td>3</td><td></td><td>22</td></tr></tbody></table><p>现在id=2的数据中name=NULL，id=3的数据中name=&quot;&quot;，但是我如果要查询id=20的数据呢，很明显，id=20的数据不存在，所以之后查询出的数据就是N/A，因此N/A表示的是不存在，根本就没有这条数据，所以在磁盘上不占用空间，而NULL其实也是值的一种，只不过这个值比较特殊罢了。</p>`,19);function c(o,u){return s(),e("div",null,[r,a(" more "),t])}const m=n(l,[["render",c],["__file","MySQL中NULL的三种情况.html.vue"]]);export{m as default};
