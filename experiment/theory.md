# Discrete Random Variables

Given an experiment and the corresponding set of possible outcomes (the sample space), a random variable associates a particular number with each outcome. We refer t this number as the numerical value of the random variable. 

From the previous experiment, we understood that a random variable is a real valued function of the experimental outcome. A random variable is called discrete  if its range (the set of values it can take) is either finite or countably infinite. 

#### Example:
Consider the experiment of choosing a point from the interval $[-1, 1]$. The random variable that associates with the numerical value $a^2$ to the outcome $a$ is not discrete. The random variable that associates with the numerical value
$$
\begin{equation}
sgn(a) = \begin{cases}
  1 & \text{if $a>0$ } \\
  -1 & \text{if $a<0$ } \\
  0 & \text{otherwise}
\end{cases}
\end{equation}
$$

is discrete. The distribution of a discrete random variable may be specified via its probability mass function. Its distribution function $F(x) = \mathbb{P}(X \leq x)$ is a jump function.

### Definition _(Probability mass function)_:
The most important way to characterize a random variable s through the probability values it takes. For a discrete random variable $X$, these are captured by the PMF. The probability mass function of a discrete random variable $X$ is the function $f: \mathbb{R} \rightarrow [0,1]$ given by $f(x) = \mathbb{P}(X=x)$. The distribution and mass functions are related by

$$
\begin{equation}
    F(x) = \sum_{i: x_i \leq x} f(x_i) \text{, and } f(x) = F(x) - lim_{y \rightarrow x}F(y)
\end{equation}
$$

The probability mass function $f: \mathbb{R} \rightarrow [0, 1]$ satisfies:
- the set of $x$ such that $f(x) \neq 0$ is countable
- $\sum_{x_i} f(x_i) = 1$, where $x_1, x_2, \cdots$ are the values of $x$ such that $f(x) \neq 0$

## Independence

Two discrete variables $X, \& Y$ are independent if the numerical value of $X$ does not affect the distribution of $Y$.

### Definition _(Independent random variables)_:
Discrete random variables $X$ and $Y$ are independent if the events $\{X = x\}$ and $\{Y = y\}$ are independent for all $x$ and $y$.

If $X$ and $Y$ are independent and $g,h : \mathbb{R} \rightarrow \mathbb{R}, $ then $g(X)$ and $h(Y)$ are independent also. More generally we say that a family $\{X_i : i \in I\}$ of discrete random variables is independent if the events $\{X_i = x_i\}, i \in I$, are independent for all possible choices of the set $\{x_i: i\in I\}$ of the values of $X_i$.

## Expectation, Mean and Variance

The expectation of $X$ is a weighted average of the possible values of $X$ in proportion to probabilites. We define the expected value (also called the expectation) of a random variable $X$ with PMF  $p_X$ by  


### Definition _(Mean value or Expectation)_:
The mean value or expectation or expected value of the ramdom variable $X$ with mass function $f$ is defined to be $\mathbb{E}(X) = \sum_{x: f(x) > 0} x f(x)$ whenever this sum is absolutely convergent. 

We require absolute convergence in order that $\mathbb{E}(X)$ be unchanged by reordering the $x_i$. We can for notational convenience, write $\mathbb{E}(X) = \sum_{x} xf(x)$. If $X$ has a mass function $f$ and $g: \mathbb{R} \rightarrow \mathbb{R}$, then $\mathbb{E}(g(X)) = \sum_{x} g(x)f(x)$ whenever this sum is absolutely convergent.

Besides the mean, there are several other quantities that we can associate with a random variable, and its PMF as discussed below:


### Definition _(k-th moment)_:
If $k$ is a positive integer, the $k^{th}$ moment $m_k$ of $X$ is definied to be $m_k = \mathbb{E}(X^k)$. The $k^{th}$ central moment $\sigma_k$ is $\sigma_k = \mathbb{E}[(X-m_1)^k]$.

The two moments of most use are $m_1 = \mathbb{E}(X)$ and $\sigma_2 = \mathbb{E}[(X - \mathbb{E}(X))^2]$, called the mean and variance of $X$ respectively.

### Definition (Variance of $X$)
The variance provides a measure of dispersion of $X$ around its mean. Another measure of dispersion is the standard deviation of $X$, which is defined as the square root of the variance and is denoted by $\sigma_{X}$:
$$
\begin{equation}
    \sigma_{X} = \sqrt{Var(X)}
\end{equation}
$$
The variance of X is given by,

$$
\begin{equation}
var(X) = \mathbb{E}[(X - \mathbb{E}(X))^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2
\end{equation}
$$

The expectation operator $\mathbb{E}$ has the following properties:
- if $X \geq 0$ then $\mathbb{E}(X) \geq 0$
- if $a, b \in \mathbb{R}$ then $\mathbb{E}(aX + bY) = a \mathbb{E}(X) + b\mathbb{E}(Y)$
- the random variabe 1, taking the value 1 always has expectation $\mathbb{E}(1) = 1$

## Examples of discrete variables

- Bernoulli trials: A random variable $X$ takes values 1, and 0 with probabilities $p$ and $1-p$ respectively. Sometimes we think of these values as representing the 'success' or 'failure' of a trial. COnsider the toss of a coin, which comes up a head with probability $p$ and tails with probability $1-p$. The Bernoulli random variable takes values $0$ and $1$ depending on whether the outcome is a head or a tail. The mass function is $f(0) = 1-p, f(1) = p$ and it follows that $\mathbb{E}[X] = p$ and $Var(X) = p(1-p)$. 

- Binomial distribution: We perform n independent Bernoulli trials $X_1, X_2, \cdots, X_n$ and count the total number of successes $Y = X_1 + X_2 + \cdots + X_n$. The mass function of Y is $f(k) = \binom{n}{k} p^k (1-p)^{n-k}, k = 0,1, \cdots, n$. Imagine we repeatedly toss a coin $n$ times. At each toss the coin comes up a head with probabilit $p $ and tail with probability $1-p$, independent of prior tosses.Let the random variable $X$ be the number of heads  in the $n-$toss sequence. We refer to $X$ as a Binomial random variable with parameters $n, $ and $p$. Here the expecation $\mathbb{E}[Y] = np$ and $Var(Y) = np(1-p)$

- Poisson distribution: A poisson variable is a random variable with the poisson mass function $f(x) = \frac{\lambda^k}{k!} e^{-\lambda}, k = 0,1,2, \cdots$ for some $\lambda > 0$. TO get a feel for the poisson random variable, think of a binomial random variable with very small $p$ and a very large $n$.  More precisely the poisson PMF with parameters $\lambda$ is a good approximation for a bnomial PMF with parameters $n$ and $p$ provided $\lambda = n * p$, $n$ is very large and $p$ is very small. Both the mean and the variance of the distribution are equal to $\lambda$.

- Geometric distribution: A geometric random variable is a random variable with the geometric mass function $f(k) = p (1-p)^{1-k}, k = 1,2, \cdots$ for some number $p \in (0,1)$. Suppose that independent Bernoulli trials (parameter $p$) are performed $1,2, \cdots, n$ times. Let $W$ be the time which elapses before the first success; $W$ is called a waiting time. Then $\mathbb{P}(X > k) = (1-p)^k$, and thus $\mathbb{P}(X = k) = p(1-p)^{k-1}$. Here the expecation $\mathbb{E}[X] = p^{-1}$ and $Var(X) = (1-p)p^{-2}$. Imagine we repeatedly and independently toss a coin with probability of head is p, where $0 \leq p \leq 1$. The geometric random variable is the number of tosses needed for a head to comeup for the first time. 

# Continous Random Variables
Random variables with a continuous range of possible values are quite common; the velocity of a vehicle traveling along the highway could be one example. If the velocity is measured by a digital speedometer, we may view the speedometer's reading as a discrete random variable. But if we wish to model the exact velocity, a continuous random variable is called for.

A random variable X is called continous if there is a non negative function $f_X$ called th probability density function of $X$, or PDF for short, such that
$$
\begin{equation}
\mathbb{P}(X \in B) = \int_B f_X(x) dx
\end{equation}
$$
for every subset B of the real line. In particular, the probability vthat the value of $X$ falls within an interval is 
$$
\begin{equation}
\mathbb{P}(a \leq X \leq b) = \int_a^b f_X(x)dx
\end{equation}
$$
and can be interpreted as the area under the graph of the PDF. For any single value $a$, $\mathbb{P}(X=a) = 0$. FOr this reason, including or excluding th endpoints of an interval has no effect on its probability:
$$
\begin{equation}
P(a \leq X\leq b)= P(a < X <b ) = P(a \leq X < b) = P(a < X \leq b)
\end{equation}
$$ 

A function $f_X$ must be non negative for every $x$ and must also have the normalization property $\int_{-\infty}^{\infty} f_Xdx= P(-\infty < X < \infty) = 1$. Graphically this means that the entire area under the graph of the PDF must be equal to 1. 


### Expectation:


### Types of Continous random variables: