import{_ as a,W as s,X as n,Y as e,Z as t,a0 as p}from"./framework-91490e6a.js";const c={},i=t("p",null,"Redis踩坑",-1),o=p(`<h1 id="redis踩坑" tabindex="-1"><a class="header-anchor" href="#redis踩坑" aria-hidden="true">#</a> Redis踩坑</h1><h2 id="redis的value中-无法转换为字符串" tabindex="-1"><a class="header-anchor" href="#redis的value中-无法转换为字符串" aria-hidden="true">#</a> redis的value中&#39;_&#39;无法转换为字符串</h2><p>开发中遇到了一次报错，打印日志信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Could not read JSON: Unexpected character (&#39;_&#39; (code 95)): Expected space separating root-level values
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以下为具体信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>at [Source: (byte[])&quot;67_rbnrySG4SMrLmOdlzhEhsJdLtKezhCksAwMhDsYxIYFvd-BAbIJfAO5uj0OLa4iNeuyJteRhTq8op5mIR0Lv0Jo4gCRyMOSe_CkQUb_Sfu01bhZjq6r5u_2CRtgNAKbAGABOY&quot;; line: 1, column: 4]; nested exception is com.fasterxml.jackson.core.JsonParseException: Unexpected character (&#39;_&#39; (code 95)): Expected space separating root-level values
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>报错代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> <span class="token class-name">RedisTemplate</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> acstoken <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span><span class="token class-name">RedisTemplate</span><span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;ACESS_TOKEN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实通过以上的代码和报错信息可以知道，大概得意思就是说无法从Redis中取得ACESS_TOKEN的值，因为值中的&#39;_&#39;无法解析成String类型。</p><p>这种问题的解决方式也很简单，我们可以注入的RedisTemplate更改为StringRedisTemplate就可以了</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>
<span class="token class-name">String</span> acstoken <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;ACESS_TOKEN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function l(d,u){return s(),n("div",null,[i,e(" more "),o])}const v=a(c,[["render",l],["__file","Redis踩坑.html.vue"]]);export{v as default};
