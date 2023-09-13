import{_ as a,W as e,X as s,Y as i,Z as n,$ as p,a0 as t}from"./framework-91490e6a.js";const l={},o=n("p",null,[n("code",null,"more"),p(" 本文章主要介绍Spring框架整体架构，Spring的核心IOC，AOP的案例和具体实现机制；以及SpringMVC框架的案例和实现机制。")],-1),r=t(`<h1 id="spring常见面试题总结" tabindex="-1"><a class="header-anchor" href="#spring常见面试题总结" aria-hidden="true">#</a> Spring常见面试题总结</h1><h2 id="_1-spring" tabindex="-1"><a class="header-anchor" href="#_1-spring" aria-hidden="true">#</a> 1 Spring</h2><h3 id="_1-1-spring框架的好处" tabindex="-1"><a class="header-anchor" href="#_1-1-spring框架的好处" aria-hidden="true">#</a> 1.1 Spring框架的好处</h3><p>spring框架是轻量级的，最基本的版本只有2M左右</p><p>spring中集成了包括ioc，aop，事务管理，异常处理，测试，MVC框架等模块，极大的提高了开发人员的效率，也简化了程序的开发。</p><h3 id="_1-2、区分beanfactory和applicationcontext" tabindex="-1"><a class="header-anchor" href="#_1-2、区分beanfactory和applicationcontext" aria-hidden="true">#</a> 1.2、区分BeanFactory和ApplicationContext？</h3><p>BeanFactory：采用懒加载，使用语法显示提供资源对象，不支持国际化，不支持基于依赖的注解</p><p>ApplicationContext：采用即时加载，需要自己创建和管理资源对象，支持国际化，支持基于依赖的注解</p><p>BeanFactory：</p><ul><li>优点：占用的资源较少，在对资源有较高要求的时候，会有一定的优势</li><li>缺点：运行速度会慢，而且可能出现空指针异常，通过Bean工厂创建的bean的生命周期比较简单</li></ul><p>ApplicationContext：</p><ul><li>优点：所有的Bean在启动的时候就进行加载了，系统运行的速度比较快，而且在启动的时候可以发现配置文件中存在的问题</li><li>缺点：所有Bean都是在启动的时候就开始预加载了，因此占用的内存资源比较多</li></ul><h3 id="_1-3、依赖注入" tabindex="-1"><a class="header-anchor" href="#_1-3、依赖注入" aria-hidden="true">#</a> 1.3、依赖注入</h3><p>也就是不用创建对象，但是需要描述如何创建的，在配置文件中描述哪些组件需要哪些服务就行了，由ioc容器来装配它们。</p><h3 id="_1-4、ioc容器" tabindex="-1"><a class="header-anchor" href="#_1-4、ioc容器" aria-hidden="true">#</a> 1.4、IOC容器</h3><p>spring ioc容器是spring 的核心，ioc指的是控制反转，也就是将创建对象的主动权交给ioc容器去进行管理和创建，并完成对象的注入，ioc容器是使用依赖注入来管理和配置应用程序的组件的，ioc容器会根据配置文件或者注解中的配置数据来管理对象并实例化对象。</p><h3 id="_1-5、-autowired和-resource注解有什么区别" tabindex="-1"><a class="header-anchor" href="#_1-5、-autowired和-resource注解有什么区别" aria-hidden="true">#</a> 1.5、 @Autowired和@Resource注解有什么区别？</h3><ul><li>@Autowired是Spring提供的注解，@Resource是JDK提供的注解。</li><li>@Autowired是只能按类型注入，@Resource默认按名称注入，也支持按类型注入。</li><li>@Autowired按类型装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它required属性为false，如果我们想使用按名称装配，可以结合@Qualifier注解一起使用。</li><li>@Resource有两个中重要的属性：name和type。name属性指定byName，如果没有指定name属性，当注解标注在字段上，即默认取字段的名称作为bean名称寻找依赖对象，当注解标注在属性的setter方法上，即默认取属性名作为bean名称寻找依赖对象。需要注意的是，@Resource如果没有指定name属性，并且按照默认的名称仍然找不到依赖对象时， @Resource注解会回退到按类型装配。但一旦指定了name属性，就只能按名称装配了。</li></ul><h3 id="_1-6、spring中默认提供的单例是线程安全的吗" tabindex="-1"><a class="header-anchor" href="#_1-6、spring中默认提供的单例是线程安全的吗" aria-hidden="true">#</a> 1.6、Spring中默认提供的单例是线程安全的吗？</h3><ul><li>不是。</li><li>Spring容器本身并没有提供Bean的线程安全策略。</li><li>如果单例的Bean是一个无状态的Bean，即线程中的操作不会对Bean的成员执行查询以外的操作，那么这个单例的Bean是线程安全的。比如，Controller、Service、DAO这样的组件，通常都是单例且线程安全的。如果单例的Bean是一个有状态的Bean，则可以采用ThreadLocal对状态数据做线程隔离，来保证线程安全</li></ul><blockquote><p>两种常见地解决方案：</p><ul><li>在bean对象中尽量避免定义可变的成员变量（不太现实）。</li><li>在类中定义一个ThreadLocal成员变量，将需要的可变成员变量保存在ThreadLocal中（推荐的一种方式）</li></ul></blockquote><h3 id="_1-7、说一说你对spring-aop的理解" tabindex="-1"><a class="header-anchor" href="#_1-7、说一说你对spring-aop的理解" aria-hidden="true">#</a> 1.7、说一说你对Spring AOP的理解</h3><p>​ AOP（Aspect Oriented Programming）是面向切面编程，它是一种编程思想，是面向对象编程（OOP）的一种补充。面向对象编程将程序抽象成各个层次的对象，而面向切面编程是将程序抽象成各个切面。所谓切面，相当于应用对象间的横切点，我们可以将其单独抽象为单独的模块。</p><p>​ 术语：</p><ul><li>连接点（join point）：对应的是具体被拦截的对象，因为Spring只能支持方法，所以被拦截的对象往往就是指特定的方法，AOP将通过动态代理技术把它织入对应的流程中。</li><li>切点（point cut）：有时候，我们的切面不单单应用于单个方法，也可能是多个类的不同方法，这时，可以通过正则式和指示器的规则去定义，从而适配连接点。切点就是提供这样一个功能的概念。</li><li>通知（advice）：就是按照约定的流程下的方法，分为前置通知、后置通知、环绕通知、事后返回通知和异常通知，它会根据约定织入流程中。</li><li>目标对象（target）：即被代理对象。</li><li>引入（introduction）：是指引入新的类和其方法，增强现有Bean的功能。</li><li>织入（weaving）：它是一个通过动态代理技术，为原有服务对象生成代理对象，然后将与切点定义匹配的连接点拦截，并按约定将各类通知织入约定流程的过程。</li><li>切面（aspect）：是一个可以定义切点、各类通知和引入的内容，SpringAOP将通过它的信息来增强Bean的功能或者将对应的方法织入流程。</li></ul><h3 id="_1-8、-component和-bean的区别" tabindex="-1"><a class="header-anchor" href="#_1-8、-component和-bean的区别" aria-hidden="true">#</a> 1.8、@Component和@Bean的区别</h3><ul><li><p>@Component通常需要类路径扫描来自动装配到spring容器中，是隐式的一对一的映射；而@Bean通常在标有该注解的方法中产生这个bean，告诉spring这是某个类的实例，在我需要的时候还给我，是显式声明单个bean，将类定义与bean的声明分开</p></li><li><p>@Bean比@Component自定义性更强，在很多情况下都只能采用@Bean，比如说在使用第三方类库时，如果需要将第三方类库装配到spring容器中，就只能使用@Bean</p></li></ul><h3 id="_1-9、spring中声明一个类为bean的注解有哪些" tabindex="-1"><a class="header-anchor" href="#_1-9、spring中声明一个类为bean的注解有哪些" aria-hidden="true">#</a> 1.9、spring中声明一个类为bean的注解有哪些？</h3><ul><li>@Component，通用的注解，可以标识任意类为spring组件，如果一个bean不知道属于哪一层，就可以使用@Component来进行标识</li><li>@Repository，用于标识dao层，主要用于数据库操作</li><li>@Service，用于标识业务层，主要用于处理复杂的业务逻辑</li><li>@Controller，对应MVC的Controller层，主要用于接收用户请求并调用Service层方法返回数据给前端页面</li></ul><h3 id="_1-10、spring事务有几种" tabindex="-1"><a class="header-anchor" href="#_1-10、spring事务有几种" aria-hidden="true">#</a> 1.10、Spring事务有几种？</h3><ul><li>编程式事务：就是在代码中采用硬编码（不推荐使用）</li><li>声明式事务：在配置文件中进行配置，分为基于xml配置的声明式事务或者基于注解的声明式事务（推荐使用）</li></ul><h3 id="_1-11、spring事务的隔离级别" tabindex="-1"><a class="header-anchor" href="#_1-11、spring事务的隔离级别" aria-hidden="true">#</a> 1.11、Spring事务的隔离级别？</h3><p>一共有五种隔离级别：</p><ul><li>ISOLATION_DEFAULT:使用后端数据库默认的隔离级别，MySQL默认隔离级别是REPEATABLE_READ</li><li>ISOLATION_UNCOMMITTED:最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读、不可重复读</li><li>ISOLATION_COMMITTED:允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读和不可重复读仍然有可能发生</li><li>ISOLATION_REPEATABLE_READ:对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍可能发生</li><li>ISOLATION_SERIALIZABLE：最高的隔离级别，完全服从ACID隔离级别，所有的事务一依次逐个执行，这样事务之间就完全不可能产生干扰，该级别可以防止脏读，幻读，不可重复读，但是会严重影响性能，通常也不会使用到该级别</li></ul><h3 id="_1-12、spring如何定义bean的范围" tabindex="-1"><a class="header-anchor" href="#_1-12、spring如何定义bean的范围" aria-hidden="true">#</a> 1.12、spring如何定义bean的范围</h3><p>可以通过scope属性来定义，bean 的范围默认有五中：</p><ul><li>singleton：spring中的bean默认都是单例的</li><li>prototype：每次请求都创建一个新的bean</li><li>request：每次http请求都创建一个新的bean。这个bean 的范围只在一次http的request中有效</li><li>session：每次http请求都创建一个新的bean。这个bean 的范围只在一次http的session中有效</li><li>global-session：全局session作用域，spring5之后被取消了</li></ul><h3 id="_1-13、spring-bean-的生命周期" tabindex="-1"><a class="header-anchor" href="#_1-13、spring-bean-的生命周期" aria-hidden="true">#</a> 1.13、Spring Bean 的生命周期</h3><p>产生</p><ul><li><p>开发人员命令spring启动时开始，启动开始时，通过加载<code>Bean定义loadBeanDefinitions方法</code>，用<code>xml，注解扫描</code>等各种方式，将定义的Bean类全部找到，并将其放入到容器中的一个<code>Bean定义集合beanDefinitionMap</code>中。有了这些Bean定义的集合后，就可以遍历这个集合，然后<code>通过createBean方法</code>创建这些Bean对象。</p></li><li><p>创建Bean对象大致分为<code>构造对象（实例化）、填充属性、初始化实例、注册销毁</code>四个步骤</p><ul><li><p>构造对象：<code>通过createBeanInstance方法</code>进行对象构造，先用<code>反射机制从Bean定义中的BeanClass</code>拿到这个类的构造方法。之后准备构造方法需要的参数，<code>通过Spring内部的单例池</code>中根据参数的Class类进行查找（如果这个类具有多个实例，则会通过参数名进行查找；如果没有找到，则认为构造信息不完整而抛出异常），参数准备好后就可以<code>通过反射进行Bean的构造</code>了（也就是常说的实例化），如果选择的是无参构造，则无需参数，直接构造就行了</p><blockquote><ul><li>如果获取构造方法时，这个方法只有一个构造方法，那就只能拿这一个，但如果Bean中有多个构造方法时，则会先拿带有@Autowired注解的构造方法，如果多个构造方法都带有@Autowired注解，那个Spring容器将无法判断到底用哪一个，将会抛出异常；如果构造方法都没有带@Autowired注解，那么会优先选用无入参构造方法；如果多个构造方法都无入参，Spring容器无法判断选用哪一个，那就会抛出异常</li><li>不建议在任何Bean中添加多个构造方法，会导致可读性差，不易理解，维护也会很困难</li></ul></blockquote></li><li><p>属性填充：在Bean对象构造成功后，就可以进行属性填充了，<code>通过populateBean方法</code>为Bean内部的所需的属性进行赋值填充，通常就是带有@AutoWired注解的变量，会通过三级缓存机制进行填充（也就是所谓的依赖注入）</p></li><li><p>初始化实例：属性填充后，就要<code>通过InitializeBean方法</code>对实例进行初始化了。初始化的第一步是初始化容器的相关信息，通过<code>invokeAwareMethods</code>方法，为实现了<code>Aware接口的Bean设置诸如beanName，beanFactory等</code>容器信息，之后<code>通过invokeInitMethods方法执行Bean的初始化方法</code>。这个方法设计开发人员通过实现InitializeBean接口而实现的<code>afterPropertiesSet</code>方法。在<code>afterPropertiesSet</code>方法执行后，还会继续执行开发人员在Bean上自定义的initMethod方法，在执行初始化方法之前和之后还需要对<code>Bean后置处理器BeanPostProcessors</code>进行处理，Spring通过applyBeanProcessorsBeforeInitialization、applyBeanProcessorsAfterInitialization分别在初始化之前和之后处理各种Bean的后置处理器，处理器包括Spring提供的负责AOP处理的AnnotationAwareAspectJAutoProxyCreator、负责构造后@PostConstruct和销毁前@PreDestroy处理的InitDestroyAnnotationBeanPostProcessor等系统级处理器，以及开发人员通过是实现BeanPostProcessor接口的自定义处理器，这些处理器很多，可以通过实现PriorityOrdered接口指定顺序进行逐一处理</p><blockquote><ul><li>Aware接口代表信息感知接口，一旦实现了该接口，就可以在bean实例中感知并获取到对应的信息</li></ul></blockquote></li><li><p>注册销毁：以上步骤完成后Bean实例就已经可用了，为了让Bean销毁，Spring通过注册销毁registerDisposableBean方法将实现了销毁接口DisposableBean的Bean进行注册，这样在销毁时就可以执行destroy方法了</p></li></ul></li><li><p>通过以上四步Bean就被创建好了，之后只需要将这些bean对象通过addSingleton方法放入单例池singletonObjects中就可以被获取和使用了，至此产生Bean就全部完成了，之后开发人员就可以使用这些Bean了</p></li></ul><p>使用</p><p>销毁</p><ul><li>最后执行close方法之后，在销毁之前需要先执行销毁前处理器postProcessBeforeDestruction，这里会执行Bean中@PreDestroy注解的方法，然后通过destroyBeans方法逐一销毁Spring中所有的Bean，销毁时会执行destroy方法，destroy方法执行之后，会通过客户销毁方法invokeCustomDestroyMethod来执行开发人员在Bean上自定义的destroyMethod方法</li></ul><h3 id="_1-14、spring通过三级缓存解决循环依赖" tabindex="-1"><a class="header-anchor" href="#_1-14、spring通过三级缓存解决循环依赖" aria-hidden="true">#</a> 1.14、spring通过三级缓存解决循环依赖</h3><h5 id="_1-14-1循环依赖" tabindex="-1"><a class="header-anchor" href="#_1-14-1循环依赖" aria-hidden="true">#</a> 1.14.1循环依赖</h5><p>指循环引用，是两个或多个Bean之间互相持有对方的引用</p><ul><li>相互依赖：</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">AService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">BService</span> bService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">BService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">AService</span> aService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三者间依赖：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">AService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">BService</span> bService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">BService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">CService</span> cService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">CService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">AService</span> aService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自我依赖：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">class</span> <span class="token class-name">AService</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Autowired</span>
  <span class="token keyword">private</span> <span class="token class-name">AService</span> aService<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>循环依赖本身是没有问题的，但是spring中加入了依赖注入机制（当我们创建Bean实例化之后，就要给Bean中的属性自动赋值，赋值之后才能交给用户使用）。</p><h4 id="_1-14-2-使用缓存解决循环依赖" tabindex="-1"><a class="header-anchor" href="#_1-14-2-使用缓存解决循环依赖" aria-hidden="true">#</a> 1.14.2 使用缓存解决循环依赖</h4><p>将所有实例化好的Bean放入容器中缓存起来，将已经完成实例化，但是没有完成赋值的Bean打上标记，等Bean全部实例化后再重新扫描一遍容器，将没有完成赋值的Bean的属性完成赋值，此时没有完成赋值的Bean就可以找到对应的实例了</p><p>一级缓存：</p><p>假设我们只有一个缓存容器，缓存是直接开放给用户使用的，如果将未完成赋值的Bean和已完成赋值的Bean全部放在同一个容器中，那么调用者就可能拿到未完成赋值的Bean，此时当前的Bean是不可用的，会产生空指针异常。</p><p>二级缓存：</p><p>将直接能够提供给用户使用的Bean放入一个缓存中，这种Bean被称为终态Bean或者成熟的Bean。 将已经完成初始化，但还不能提供给用户使用的Bean放入一个缓存中，这种Bean被称为临时Bean或者早期的Bean</p><p>三级缓存：</p><p>Spring中有很多注入的Bean需要去创建代理的Bean，但是不是所有的Bean都是实例化之后就立刻创建代理Bean的，是需要等到Bean初始化之后，才能去创建代理Bean。循环依赖的出现，spring不得不去提前创建代理Bean，如果不创建代理Bean，注入原石的Bean就会产生错误。因此spring设计了三级缓存，专门用来存储代理Bean。每个Bean的代理Bean的创建规则又不一样，因此spring三级缓存中并不是直接去保存代理Bean的引用，而是保存了代理Bean的Factory。</p><p><strong>结论：</strong></p><p>单独解决循环依赖，可以使用二级缓存，但是如果设计到代理对象的循环依赖，就需要用三级缓存</p><p>一二三级缓存是根据获取对象的顺序命名的：</p><ul><li>一级缓存就是终态缓存</li><li>二级缓存就是临时缓存</li><li>三级缓存就是代理工厂的缓存</li></ul><p><strong>三级缓存：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 一级缓存（单例池）</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> singletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 二级缓存</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> earlySingletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 三级缓存</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> singletonFactories <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三个缓存Map的作用：</p><ul><li>一级缓存（单例池）：用来保存完整的生命周期对象</li><li>二级缓存：保存还没有经过完整的生命周期的对象</li><li>三级缓存：为了打破循环，应对需要AOP处理的对象</li></ul><h4 id="_1-14-3-具体地执行流程" tabindex="-1"><a class="header-anchor" href="#_1-14-3-具体地执行流程" aria-hidden="true">#</a> 1.14.3 具体地执行流程</h4><p>在A对象进行实例化前，先将A对象放入creatingSet集合中，表示当前A对象正在创建中。 A：SpringBean的生命周期第一步：实例化：A对象实例化时，将创建的A对象的普通对象放入singletonFactories的Map集合中（以A对象名称为key，lambda表达式为value）</p><p>A：SpringBean的生命周期第二步：依赖注入：对A对象完成依赖注入 此时需要创建B对象，创建前将B对象放入creatingSet集合中，表示当前B对象正在创建中</p><ul><li><p>首先进入单例池中查找A对象，如果有直接用，没有则判断creatingSet集合中是否存在B对象，不存在说明没有产生循环依赖</p><ul><li>则进入SingletonObjects的Map集合中查询</li><li>存在有说明正在创建中，表示产生了循环依赖，则进入earlySingletonObjects的Map集合中查找B对象，有则直接用，没有则进入singletonFactories查找当前B对象，判断是否需要进行AOP <ul><li>如果需要则进行AOP产生A对象的代理对象，返回将A对象的代理对象放入earlySingletonObjects的Map集合中，将当前当前bean放入到earlyProxyReferences的Map集合中</li><li>如果不需要进行AOP，则将A对象的普通对象放入earlySingletonObjects的Map集合中</li></ul></li></ul></li><li><p>B：SpringBean的生命周期第一步：实例化：实例化B对象</p></li><li><p>B：SpringBean的生命周期第二步：依赖注入：对B对象进行依赖注入</p><ul><li>首先进入单例池中查找A对象，如果有直接用，没有则判断creatingSet集合中是否存在A对象，不存在说明没有产生循环依赖 <ul><li>则进入SingletonObjects的Map集合中查询</li></ul></li><li>存在有说明正在创建中，表示产生了循环依赖，则进入earlySingletonObjects的Map集合中查找A对象，有则直接用，没有则进入singletonFactories查找当前A对象，判断是否需要进行AOP <ul><li>如果需要则进行AOP产生A对象的代理对象，返回将A对象的代理对象放入earlySingletonObjects的Map集合中</li><li>如果不需要进行AOP，则将A对象的普通对象放入earlySingletonObjects的Map集合中</li></ul></li></ul></li></ul><p>循环依赖解决后继续执行bean声明周期的其他步骤</p><p>在初始化前或者初始化后执行AOP，会通过earlyProxyReferencesMap查询是否进行了AOP，如果进行了，那么此时就不会继续执行AOP的操作了</p><p>在初始化时将二级缓存中的bean对象放入一级缓存（单例池）中完成初始化</p><h4 id="_1-14-4-构造注入产生循环依赖" tabindex="-1"><a class="header-anchor" href="#_1-14-4-构造注入产生循环依赖" aria-hidden="true">#</a> 1.14.4 构造注入产生循环依赖</h4><p>如果构造方法中没有无参构造，那么可能产生循环依赖，如果有无参构造则不会产生循环依赖。</p><p>解决方案：添加一个无参构造；使用@Lazy注解解决循环依赖</p><p>@Lazy注解是在构造注入时，直接给构造方法中的参数一个代理对象，因此就不会产生循环依赖了，那么属性中的对象最后就是一个代理对象，但是在进行一些操作的时候，代理对象会进入spring容器中找到对应的普通对象完成相关操作</p><h3 id="_1-15-springmvc的工作流程" tabindex="-1"><a class="header-anchor" href="#_1-15-springmvc的工作流程" aria-hidden="true">#</a> 1.15 SpringMVC的工作流程</h3><p>客户端发送请求后由DispatcherServlet（前端控制器）根据请求调用HandlerMapping（处理器映射）来查询到具体的Handler（处理器），之后将具生成的Handler和HandlerInterceptor（处理器）一并返回给DispatcherServlet，之后DispatcherServlet会去通过Handler找到对应的Controller去执行处理数据，然后返回给DispatcherServlet一个ModelAndView对象，之后DispatcherServlet会通过视图解析器解析并渲染ModelAndView对象，得到一个View视图，最后DispatcherServlet会将View响应给用户的请求。</p><figure><img src="https://xcy-icu-interview-1304336794.cos.ap-nanjing.myqcloud.com/SpringMVC-Executive-process.png" alt="SpringMVC执行流程" tabindex="0" loading="lazy"><figcaption>SpringMVC执行流程</figcaption></figure><h2 id="_2-springboot" tabindex="-1"><a class="header-anchor" href="#_2-springboot" aria-hidden="true">#</a> 2 SpringBoot</h2><p>1、什么是SpringBoot是spring开源组织下的一个子项目，主要提供spring问题的一站式解决方案，简化了spring，让开发者可以快速上手</p>`,85);function c(d,u){return e(),s("div",null,[o,i(" more "),r])}const g=a(l,[["render",c],["__file","spring-01.html.vue"]]);export{g as default};
