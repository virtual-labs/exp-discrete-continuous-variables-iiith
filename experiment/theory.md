# Discrete Random Variables

Given an experiment and the associated set of possible outcomes (the sample space), a random variable assigns a specific number to each outcome. This number is referred to as the numerical value of the random variable.

From the previous experiment, we understood that a random variable is a real-valued function of the experimental outcome. A random variable is called discrete if its range (the set of values it can take) is either finite or countably infinite.

#### Example:
Consider the experiment of selecting a point from the interval $[-1, 1]$. The random variable that associates the numerical value $a^2$ to the outcome $a$ is not discrete. However, the random variable that associates the numerical value

$$
sgn(a) = \begin{cases}
  1 & \text{if $a>0$} \\
  -1 & \text{if $a<0$} \\
  0 & \text{otherwise}
\end{cases}
$$

is discrete. The distribution of a discrete random variable may be specified through its probability mass function. Its distribution function $F(x) = \mathbb{P}(X \leq x)$ is a jump function.

### Definition _(Probability mass function)_:
The most important way to characterize a random variable is through the probability values it takes. For a discrete random variable $X$, these are captured by the PMF. The probability mass function of a discrete random variable $X$ is the function $f: \mathbb{R} \rightarrow [0,1]$ given by $f(x) = \mathbb{P}(X=x)$. The distribution and mass functions are related by

$$
F(x) = \sum_{i: x_i \leq x} f(x_i), \quad \text{and} \quad f(x) = F(x) - \lim_{y \rightarrow x}F(y)
$$

The probability mass function $f: \mathbb{R} \rightarrow [0, 1]$ satisfies:
- the set of $x$ such that $f(x) \neq 0$ is countable
- $\sum_{x_i} f(x_i) = 1$, where $x_1, x_2, \cdots$ are the values of $x$ such that $f(x) \neq 0$

## Independence

Two discrete variables $X$ and $Y$ are independent if the numerical value of $X$ does not affect the distribution of $Y$.

### Definition _(Independent random variables)_:
Discrete random variables $X$ and $Y$ are independent if the events $\{X = x\}$ and $\{Y = y\}$ are independent for all $x$ and $y$.

If $X$ and $Y$ are independent and $g,h : \mathbb{R} \rightarrow \mathbb{R}$, then $g(X)$ and $h(Y)$ are also independent. More generally, we say that a family $\{X_i : i \in I\}$ of discrete random variables is independent if the events $\{X_i = x_i\}, i \in I$, are independent for all possible choices of the set $\{x_i: i\in I\}$ of the values of $X_i$.

## Expectation, Mean, and Variance

The expectation of $X$ is a weighted average of the possible values of $X$ in proportion to probabilities. We define the expected value (also called the expectation) of a random variable $X$ with PMF $p_X$ by:

### Definition _(Mean value or Expectation)_:
The mean value or expectation of the random variable $X$ with mass function $f$ is defined as $\mathbb{E}(X) = \sum_{x: f(x) > 0} x f(x)$ whenever this sum is absolutely convergent.

We require absolute convergence so that $\mathbb{E}(X)$ remains unchanged by reordering the $x_i$. For notational convenience, we can write $\mathbb{E}(X) = \sum_{x} xf(x)$. If $X$ has a mass function $f$ and $g: \mathbb{R} \rightarrow \mathbb{R}$, then $\mathbb{E}(g(X)) = \sum_{x} g(x)f(x)$ whenever this sum is absolutely convergent.

Besides the mean, there are several other quantities that we can associate with a random variable and its PMF as discussed below:

### Definition _(k-th moment)_:
If $k$ is a positive integer, the $k^{th}$ moment $m_k$ of $X$ is defined as $m_k = \mathbb{E}(X^k)$. The $k^{th}$ central moment $\sigma_k$ is $\sigma_k = \mathbb{E}[(X - m_1)^k]$.

The two moments of most use are $m_1 = \mathbb{E}(X)$ and $\sigma_2 = \mathbb{E}[(X - \mathbb{E}(X))^2]$, called the mean and variance of $X$ respectively.

### Definition _(Variance of $X$)_:
The variance provides a measure of dispersion of $X$ around its mean. Another measure of dispersion is the standard deviation of $X$, which is defined as the square root of the variance and is denoted by $\sigma_{X}$:
$$
\sigma_{X} = \sqrt{Var(X)}
$$
The variance of $X$ is given by:
$$
Var(X) = \mathbb{E}[(X - \mathbb{E}(X))^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2
$$

The expectation operator $\mathbb{E}$ has the following properties:
- if $X \geq 0$ then $\mathbb{E}(X) \geq 0$
- if $a, b \in \mathbb{R}$ then $\mathbb{E}(aX + bY) = a \mathbb{E}(X) + b \mathbb{E}(Y)$
- the random variable 1, taking the value 1 always has expectation $\mathbb{E}(1) = 1$

## Bernoulli trials

A random variable $X$ takes values 1 and 0 with probabilities $p$ and $1-p$ respectively. Sometimes we think of these values as representing the 'success' or 'failure' of a trial. Consider the toss of a coin, which comes up a head with probability $p$ and tails with probability $1-p$. The Bernoulli random variable takes values 0 and 1 depending on whether the outcome is a head or a tail. The mass function is $f(0) = 1-p$, $f(1) = p$ and it follows that $\mathbb{E}[X] = p$ and $Var(X) = p(1-p)$.

## Binomial distribution

We perform $n$ independent Bernoulli trials $X_1, X_2, \cdots, X_n$ and count the total number of successes $Y = X_1 + X_2 + \cdots + X_n$. The mass function of $Y$ is $f(k) = \binom{n}{k} p^k (1-p)^{n-k}, k = 0,1, \cdots, n$. Imagine we repeatedly toss a coin $n$ times. At each toss, the coin comes up a head with probability $p$ and tail with probability $1-p$, independent of prior tosses. Let the random variable $X$ be the number of heads in the $n$-toss sequence. We refer to $X$ as a Binomial random variable with parameters $n$ and $p$. Here the expectation $\mathbb{E}[Y] = np$ and $Var(Y) = np(1-p)$.

## Poisson distribution

A Poisson variable is a random variable with the Poisson mass function $f(x) = \frac{\lambda^k}{k!} e^{-\lambda}, k = 0,1,2, \cdots$ for some $\lambda > 0$. To get a feel for the Poisson random variable, think of a Binomial random variable with a very small $p$ and a very large $n$. More precisely, the Poisson PMF with parameters $\lambda$ is a good approximation for a Binomial PMF with parameters $n$ and $p$ provided $\lambda = n \cdot p$, $n$ is very large and $p$ is very small. Both the mean and the variance of the distribution are equal to $\lambda$.

## Geometric distribution

A geometric random variable is a random variable with the geometric mass function $f(k) = p (1-p)^{k-1}, k = 1,2, \cdots$ for some number $p \in (0,1)$. Suppose that independent Bernoulli trials (parameter $p$) are performed 1,2, \cdots, $n$ times. Let $W$ be the time which elapses before the first success; $W$ is called a waiting time. Then $\mathbb{P}(X > k) = (1-p)^k$, and thus $\mathbb{P}(X = k) = p(1-p)^{k-1}$. Here the expectation $\mathbb{E}[X] = p^{-1}$ and $Var(X) = (1-p)p^{-2}$. Imagine we repeatedly and independently toss a coin with the probability of head being $p$, where $0 \leq p \leq 1$. The geometric random variable is the number of tosses needed for a head to come up for the first time.

# Continuous Random Variables

Random variables with a continuous range of possible values are quite common; the velocity of a vehicle traveling along the highway could be one example. If the velocity is measured by a digital speedometer, we may view the speedometer's reading as a discrete random variable. But if we wish to model the exact velocity, a continuous random variable is called for. The CDF of a continuous random variable is a continuous function, i.e., it does not have any jumps. Remember that jumps in the CDF correspond to points $x$ for which $P(X=x) > 0$. Thus, the fact that the CDF does not have jumps is consistent with the fact that $P(X=x)=0$ for all $x$.

### Definition (CDF):
A random variable $X$ with CDF $F_X(x)$ is said to be continuous if $F_X(x)$ is a continuous function for all $x \in \mathbb{R}$. We will also assume that the CDF of a continuous random variable is differentiable almost everywhere in $\mathbb{R}$.

## Probability Density Function (PDF):

For continuous random variables, the CDF is well-defined so we can provide the CDF. However, the PMF does not work for continuous random variables, because for a continuous random variable $P(X=x)=0$ for all $x \in \mathbb{R}$. The PDF is the
density of probability rather than the probability mass. To get a feeling for PDF, consider a continuous random variable $X$ and define the function $f_X(x)$ as follows (wherever the limit exists):
$$
f_X(x)=\lim_{\Delta \rightarrow 0^+} \frac{P(x < X \leq x+\Delta)}{\Delta}.
$$
The function $f_X(x)$ gives us the probability density at point $x$. It is the limit of the probability of the interval $(x,x+\Delta]$ divided by the length of the interval as the length of the interval goes to 0. Remember that
$$
P(x < X \leq x+\Delta)=F_X(x+\Delta)-F_X(x).
$$
$$
f_X(x)=\lim_{\Delta \rightarrow 0} \frac{F_X(x+\Delta)-F_X(x)}{\Delta} =\frac{dF_X(x)}{dx}=F'_X(x), \hspace{20pt} \textrm{if }F_X(x) \textrm{ is differentiable at }x.
$$
A random variable $X$ is called continuous if there is a non-negative function $f_X$ called the probability density function of $X$, or PDF for short, such that
$$
\mathbb{P}(X \in B) = \int_B f_X(x) \, dx
$$
for every subset $B$ of the real line. In particular, the probability that the value of $X$ falls within an interval is 
$$
\mathbb{P}(a \leq X \leq b) = \int_a^b f_X(x) \, dx
$$
and can be interpreted as the area under the graph of the PDF. For any single value $a$, $\mathbb{P}(X=a) = 0$. For this reason, including or excluding the endpoints of an interval has no effect on its probability:
$$
P(a \leq X \leq b)= P(a < X < b ) = P(a \leq X < b) = P(a < X \leq b).
$$

A function $f_X$ must be non-negative for every $x$ and must also have the normalization property
$$
\int_{-\infty}^{\infty} f_X \, dx = P(-\infty < X < \infty) = 1.
$$
Graphically this means that the entire area under the graph of the PDF must be equal to 1.

### Definition (PDF ):
Consider a continuous random variable $X$ with an absolutely continuous CDF $F_X(x)$. The function $f_X(x)$ defined by
$$
f_X(x)=\frac{dF_X(x)}{dx}=F'_X(x), \hspace{20pt} \textrm{if }F_X(x) \textrm{ is differentiable at }x
$$
is called the probability density function (PDF) of $X$. Note that for small values of $\delta$ we can write
$$
P(x < X \leq x+\delta) \approx f_X(x) \delta.
$$
Thus, if $f_X(x_1)>f_X(x_2)$, we can say
$$
P(x_1 < X \leq x_1+\delta)>P(x_2 < X \leq x_2+\delta),
$$
i.e., the value of $X$ is more likely to be around $x_1$ than $x_2$. This is another way of interpreting the PDF.

Since the PDF is the derivative of the CDF, the CDF can be obtained from the PDF by integration (assuming absolute continuity):
$$
F_X(x)=\int_{-\infty}^{x} f_X(u) \, du.
$$
Also, we have
$$
P(a < X \leq b) = F_X(b)-F_X(a)=\int_{a}^{b} f_X(u) \, du.
$$
In particular, if we integrate over the entire real line, we must get 1, i.e.,
$$
\int_{-\infty}^{\infty} f_X(u) \, du = 1.
$$
That is, the area under the PDF curve must be equal to one. Note that $f_X(x)$ is the density of probability, so it must be larger than or equal to zero, but it can be larger than 1. Consider a continuous random variable $X$ with PDF $f_X(x)$. We have

- $f_X(x) \geq 0$ for all $x \in \mathbb{R}$.
- $\int_{-\infty}^{\infty} f_X(u) \, du = 1$.
- $P(a < X \leq b) = F_X(b)-F_X(a)=\int_{a}^{b} f_X(u) \, du$.
- More generally, for a set $A$, $P(X \in A) = \int_{A} f_X(u) \, du$.

### Definition (Range):
The range of a random variable $X$ is the set of possible values of the random variable. If $X$ is a continuous random variable, we can define the range of $X$ as the set of real numbers $x$ for which the PDF is larger than zero, i.e,
$$
R_X = \{x \mid f_X(x)>0\}.
$$
The set $R_X$ defined here might not exactly show all possible values of $X$, but the difference is practically unimportant.

### Definition (Expectations):
Remember that the expected value of a discrete random variable can be obtained as
$$
EX = \sum_{x_k \in R_X} x_k P_X(x_k).
$$
Now, by replacing the sum with an integral and the PMF with the PDF, we can write the definition of the expected value of a continuous random variable as
$$
EX = \int_{-\infty}^{\infty} x f_X(x) \, dx.
$$

#### Expected Value of a Function of a Continuous Random Variable
Remember the law of the unconscious statistician (LOTUS) for discrete random variables:
$$
E[g(X)] = \sum_{x_k \in R_X} g(x_k)P_X(x_k).
$$
Now, by changing the sum to an integral and changing the PMF to the PDF, we will obtain a similar formula for continuous random variables, Law of the unconscious statistician (LOTUS) for continuous random variables:
$$
E[g(X)] = \int_{-\infty}^{\infty} g(x) f_X(x) \, dx.
$$

As we have seen before, expectation is a linear operation, thus we always have
$$
E[aX+b] = aEX+b,
$$
for all $a,b \in \mathbb{R}$, and
$$
E[X_1+X_2+\cdots+X_n] = EX_1+EX_2+\cdots+EX_n,
$$
for any set of random variables $X_1, X_2,\ldots,X_n$.

### Definition (Variance):
Remember that the variance of any random variable is defined as
$$
\textrm{Var}(X) = E\big[(X-\mu_X)^2\big] = EX^2 - (EX)^2.
$$
So for a continuous random variable, we can write
$$
\textrm{Var}(X) = E\big[(X-\mu_X)^2\big] = \int_{-\infty}^{\infty} (x-\mu_X)^2 f_X(x) \, dx
= EX^2 - (EX)^2 = \int_{-\infty}^{\infty} x^2 f_X(x) \, dx - \mu_X^2.
$$
Also remember that for $a,b \in \mathbb{R}$, we always have
$$
\textrm{Var}(aX+b) = a^2 \textrm{Var}(X).
$$

If $X$ is a continuous random variable and $Y = g(X)$ is a function of $X$, then $Y$ itself is a random variable. Thus, we should be able to find the CDF and PDF of $Y$. It is usually more straightforward to start from the CDF and then to find the PDF by taking the derivative of the CDF. Note that before differentiating the CDF, we should check that the CDF is continuous.

## Uniform Random Variable

A continuous random variable $X$ is said to have a Uniform distribution over the interval $[a,b]$, shown as $X \sim \text{Uniform}(a,b)$, if its PDF is given by
$$
f_X(x) = \begin{cases}
\frac{1}{b-a} & \quad a < x < b \\
0 & \quad x < a \text{ or } x > b
\end{cases}
$$

We have already found the CDF and the expected value of the uniform distribution. In particular, we know that if $X \sim \text{Uniform}(a,b)$, then its CDF is given by 
$$
F_X(x) = \begin{cases}
0 & \quad x < a \\
\frac{x-a}{b-a} & \quad a \leq x < b \\
1 & \quad x \geq b
\end{cases}
$$
and its mean is given by
$$
EX = \frac{a+b}{2}.
$$
To find the variance, we can find $EX^2$ using LOTUS:
$$
EX^2 = \int_{-\infty}^{\infty} x^2 f_X(x) \, dx = \int_{a}^{b} x^2 \left(\frac{1}{b-a}\right) \, dx = \frac{a^2+ab+b^2}{3}.
$$
Therefore,
$$
\textrm{Var}(X) = EX^2 - (EX)^2 = \frac{(b-a)^2}{12}.
$$

## Exponential Random Variable

The exponential distribution is one of the widely used continuous distributions. It is often used to model the time elapsed between events. A continuous random variable $X$ is said to have an exponential distribution with parameter $\lambda>0$, shown as $X \sim \text{Exponential}(\lambda)$, if its PDF is given by
$$
f_X(x) = \begin{cases}
\lambda e^{-\lambda x} & \quad x > 0 \\
0 & \quad \text{otherwise}
\end{cases}
$$

so we can write the PDF of an $\text{Exponential}(\lambda)$ random variable as
$$
f_X(x) = \lambda e^{-\lambda x} u(x).
$$

Let us find its CDF, mean, and variance. For $x > 0$, we have
$$
F_X(x) = \int_{0}^{x} \lambda e^{-\lambda t} \, dt = 1 - e^{-\lambda x}.
$$
We can get the expectation as
$$
EX = \frac{1}{\lambda}.
$$

Now let's find $\textrm{Var}(X)$. We have
$$
EX^2 = \frac{2}{\lambda^2}.
$$
Thus, we obtain
$$
\textrm{Var}(X) = EX^2 - (EX)^2 = \frac{1}{\lambda^2}.
$$

If $X \sim \text{Exponential}(\lambda)$, then
$$
EX = \frac{1}{\lambda} \quad \text{and} \quad \textrm{Var}(X) = \frac{1}{\lambda^2}.
$$

An interesting property of the exponential distribution is that it can be viewed as a continuous analogue of the geometric distribution. The most important property is that the exponential distribution is memoryless. To see this, think of an exponential random variable in the sense of tossing a lot of coins until observing the first heads. If we toss the coin several times and do not observe a heads, from now on it is like we start all over again. In other words, the failed coin tosses do not impact the distribution of waiting time from now on. The reason for this is that the coin tosses are independent. We can state this formally as follows:
$$
P(X > x + a \mid X > a) = P(X > x).
$$

If $X$ is exponential with parameter $\lambda>0$, then $X$ is a memoryless random variable, that is
$$
P(X > x + a \mid X > a) = P(X > x), \quad \text{for } a, x \geq 0.
$$

From the point of view of waiting time until the arrival of a customer, the memoryless property means that it does not matter how long you have waited so far. If you have not observed a customer until time $a$, the distribution of waiting time (from time $a$) until the next customer is the same as when you started at time zero. Let us prove the memoryless property of the exponential distribution.

$$
\begin{align*}
P(X > x + a \mid X > a) &= \frac{P(X > x + a, X > a)}{P(X > a)} \\
&= \frac{P(X > x + a)}{P(X > a)} \\
&= \frac{1 - F_X(x + a)}{1 - F_X(a)} \\
&= \frac{e^{-\lambda (x + a)}}{e^{-\lambda a}} \\
&= e^{-\lambda x} \\
&= P(X > x).
\end{align*}
$$

## Normal distribution
The Central Limit Theorem (CLT) states that if you add a large number of random variables, the distribution of the sum will be approximately normal under certain conditions. The importance of this result comes from the fact that many random variables in real life can be expressed as the sum of a large number of random variables and, by the CLT, we can argue that the distribution of the sum should be normal. The CLT is one of the most important results in probability and we will discuss it later on. Here, we will introduce normal random variables. We first define the standard normal random variable. We will then see that we can obtain other normal random variables by scaling and shifting a standard normal random variable. A continuous random variable $Z$ is said to be a standard normal (standard Gaussian) random variable, shown as $Z \sim N(0,1)$, if its PDF is given by
$$
f_Z(z) = \frac{1}{\sqrt{2 \pi}} \exp\left\{-\frac{z^2}{2}\right\}, \quad \text{for all } z \in \mathbb{R}.
$$
The $\frac{1}{\sqrt{2 \pi}}$ is there to make sure that the area under the PDF is equal to one.

Let us find the mean and variance of the standard normal distribution. To do that, we will use a simple useful fact. Consider a function $g(u): \mathbb{R} \rightarrow \mathbb{R}$. If $g(u)$ is an odd function, i.e., $g(-u) = -g(u)$, and $|\int_{0}^{\infty} g(u) \, du| < \infty$, then
$$
\int_{-\infty}^{\infty} g(u) \, du = 0.
$$

For our purpose, let
$$
g(u) = u^{2k+1} \exp\left\{-\frac{u^2}{2}\right\},
$$
where $k = 0, 1, 2, \ldots$. Then $g(u)$ is an odd function. Also, $|\int_{0}^{\infty} g(u) \, du| < \infty$. One way to see this is to note that $g(u)$ decays faster than the function $\exp\left\{-u\right\}$ and since $|\int_{0}^{\infty} \exp\left\{-u\right\} \, du| < \infty$, we conclude that $|\int_{0}^{\infty} g(u) \, du| < \infty$. Now, let $Z$ be a standard normal random variable. Then, we have
$$
EZ^{2k+1} = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{\infty} u^{2k+1} \exp\left\{-\frac{u^2}{2}\right\} \, du = 0,
$$
for all $k \in \{0, 1, 2, \ldots\}$. Thus, we have shown that for a standard normal random variable $Z$, we have
$$
EZ = EZ^3 = EZ^5 = \cdots = 0.
$$
In particular, the standard normal distribution has zero mean. This is not surprising as we can see from the PDF that it is symmetric around the origin, so we expect that $EZ = 0$. Next, let's find $EZ^2$.

$$
EZ^2 = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{\infty} u^2 \exp\left\{-\frac{u^2}{2}\right\} \, du = \frac{1}{\sqrt{2 \pi}} \left[ -u \exp\left\{-\frac{u^2}{2}\right\} \right]_{-\infty}^{\infty} + \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{\infty} \exp\left\{-\frac{u^2}{2}\right\} \, du \quad (\text{integration by parts}).
$$
The last equality holds because we are integrating the standard normal PDF from $-\infty$ to $\infty$. Thus, we conclude that for a standard normal random variable $Z$, we have
$$
\textrm{Var}(Z) = 1.
$$

So far we have shown the following:

If $Z \sim N(0,1)$, then $EZ = 0$ and $\textrm{Var}(Z) = 1$.

### CDF of the standard normal
To find the CDF of the standard normal distribution, we need to integrate the PDF function. In particular, we have
$$
F_Z(z) = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{z} \exp\left\{-\frac{u^2}{2}\right\} \, du.
$$
This integral does not have a closed form solution. We usually denote the standard normal CDF by $\Phi$.

The CDF of the standard normal distribution is denoted by the $\Phi$ function:
$$
\Phi(x) = P(Z \leq x) = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{x} \exp\left\{-\frac{u^2}{2}\right\} \, du.
$$
As we will see in a moment, the CDF of any normal random variable can be written in terms of the $\Phi$ function, so the $\Phi$ function is widely used in probability. Here are some properties of the $\Phi$ function that can be shown from its definition.

- $\lim_{x \rightarrow \infty} \Phi(x) = 1, \quad \lim_{x \rightarrow -\infty} \Phi(x) = 0$;
- $\Phi(0) = \frac{1}{2}$;
- $\Phi(-x) = 1 - \Phi(x)$, for all $x \in \mathbb{R}$.

Also, since the $\Phi$ function does not have a closed form, it is sometimes useful to use upper or lower bounds. In particular, we can state the following bounds. For all $x \geq 0$,
$$
\frac{1}{\sqrt{2\pi}} \frac{x}{x^2+1} \exp\left\{-\frac{x^2}{2}\right\} \leq 1 - \Phi(x) \leq \frac{1}{\sqrt{2\pi}} \frac{1}{x} \exp\left\{-\frac{x^2}{2}\right\}.
$$

## Normal random variables

Now that we have seen the standard normal random variable, we can obtain any normal random variable by shifting and scaling a standard normal random variable. In particular, define
$$
X = \sigma Z + \mu, \quad \text{where } \sigma > 0.
$$
Then
$$
EX = \sigma EZ + \mu = \mu,
$$
$$
\textrm{Var}(X) = \sigma^2 \textrm{Var}(Z) = \sigma^2.
$$
We say that $X$ is a normal random variable with mean $\mu$ and variance $\sigma^2$. We write
$$
X \sim N(\mu, \sigma^2).
$$
If $Z$ is a standard normal random variable and $X = \sigma Z + \mu$, then $X$ is a normal random variable with mean $\mu$ and variance $\sigma^2$, i.e.,
$$
X \sim N(\mu, \sigma^2).
$$
Conversely, if $X \sim N(\mu, \sigma^2)$, the random variable defined by
$$
Z = \frac{X - \mu}{\sigma}
$$
is a standard normal random variable, i.e., $Z \sim N(0,1)$. To find the CDF of $X \sim N(\mu, \sigma^2)$, we can write

$$
F_X(x) = P(X \leq x) = P(\sigma Z + \mu \leq x) \quad \text{(where $Z \sim N(0,1)$)} = P\left(Z \leq \frac{x - \mu}{\sigma}\right) = \Phi\left(\frac{x - \mu}{\sigma}\right).
$$

To find the PDF, we can take the derivative of $F_X$,

$$
f_X(x) = \frac{d}{dx} F_X(x) = \frac{d}{dx} \Phi\left(\frac{x - \mu}{\sigma}\right) = \frac{1}{\sigma} \Phi'\left(\frac{x - \mu}{\sigma}\right) \quad \text{(chain rule for derivative)} = \frac{1}{\sigma} f_Z\left(\frac{x - \mu}{\sigma}\right) = \frac{1}{\sigma \sqrt{2 \pi}} \exp\left\{-\frac{(x - \mu)^2}{2\sigma^2}\right\}.
$$

If $X$ is a normal random variable with mean $\mu$ and variance $\sigma^2$, i.e., $X \sim N(\mu, \sigma^2)$, then
$$
f_X(x) = \frac{1}{\sigma \sqrt{2 \pi}} \exp\left\{-\frac{(x - \mu)^2}{2\sigma^2}\right\},
$$
$$
F_X(x) = P(X \leq x) = \Phi\left(\frac{x - \mu}{\sigma}\right),
$$
$$
P(a < X \leq b) = \Phi\left(\frac{b - \mu}{\sigma}\right) - \Phi\left(\frac{a - \mu}{\sigma}\right).
$$

An important and useful property of the normal distribution is that a linear transformation of a normal random variable is itself a normal random variable.

### Theorem
If $X \sim N(\mu_X, \sigma_X^2)$, and $Y = aX + b$, where $a, b \in \mathbb{R}$, then $Y \sim N(\mu_Y, \sigma_Y^2)$ where
$$
\mu_Y = a\mu_X + b, \quad \sigma_Y^2 = a^2 \sigma_X^2.
$$
