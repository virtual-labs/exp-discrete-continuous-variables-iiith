# Discrete Random Variables

A random variable $X$ is discrete if it takes values only in some countable set $\{x_1, x_2, \cdots\}$. The distribution of a discrete random variable may be specified via its probability mass function. Its distribution function $F(x) = \mathbb{P}(X \leq x)$ is a jump function.

### Definition _(Probability mass function)_:
The probability mass function of a discrete random variable $X$ is the function $f: \mathbb{R} \rightarrow [0,1]$ given by $f(x) = \mathhbb{P}(X=x)$. The distribution and mass functions are related by

$$
\begin{equation}
    F(x) = \sum_{i: x_i \leq x} f(x_i) \text{, and } f(x) = F(x) - lim_{y \rightarrow x}F(y)
\end{equation}
$$

The probability mass function $f: \mathbb{R} \rightarrow [0, 1]$ satisfies:
- the set of $x$ such that $f(x) \neq 0$ is countable
- $\sum_{i} f(x_i) = 1$, where $x_1, x_2, \cdots$ are the values of $x$ such that $f(x) \neq 0$

## Independence

Two discrete variables $X, \& Y$ are independent if the numerical value of $X$ does not affect the distribution of $Y$.

### Definition _(Independent random variables)_:
Discrete random variables $X$ and $Y$ are independent if the events $\{X = x\}$ and $\{Y = y\}$ are independent for all $x$ and $y$.

If $X$ and $Y$ are independent and $g,h : \mathbb{R} \rightarrow \mathbb{R}, $ then $g(X)$ and $h(Y)$ are independent also. More generally we say that a family $\{X_i : i \in I\}$ of discrete random variables is independent if the events $\{X_i = x_i\}, i \in I$, are independent for all possible choices of the set $\{x_i: i\in I\}$ of the values of $X_i$.

## Expectations

### Definition _(Mean value or Expectation)_:
The mean value or expectation or expected value of the ramdom variable $X$ with mass function $f$ is defined to be $\mathbb{E}(X) = \sum_{x: f(x) > 0} x f(x)$ whenever this sum is absolutely convergent. 

We require absolute convergence in order that $\mathbb{E}(X)$ be unchanged by reordering the $x_i$. We can for notational convenience, write $\mathbb{E}(X) = \sum_{x} xf(x)$. If $X$ has a mass function $f$ and $g: \mathbb{R} \rightarrow \mathbb{R}$, then $\mathbb{E}(g(X)) = \sum_{x} g(x)f(x)$ whenever this sum is absolutely convergent.


### Definition _(k-th moment)_:
If $k$ is a positive integer, the $k^{th}$ moment $m_k$ of $X$ is definied to be $m_k = \mathbb{E}(X^k)$. The $k^{th}$ central moment $\sigma_k$ is $\sigma_k = \mathbb{E}[(X-m_1)^k]$.

The two moments of most use are $m_1 = \mathbb{E}(X)$ and $\sigma_2 = \mathbb{E}[(X - \mathh{E}(X))^2]$, called the mean and variance of $X$ respectively.

The variance of X,

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

- Bernoulli trials: A random variable $X$ takes values 1, and 0 with probabilities $p$ and $1-p$ respectively. Sometimes we think of these values as representing the 'success' or 'failure' of a trial. The mass function is $f(0) = 1-p, f(1) = p$ and it follows that $\mathbb{E}[X] = p$ and $Var(X) = p(1-p)$

- Binomial distribution: We perform n independent Bernoulli trials $X_1, X_2, \cdots, X_n$ and count the total number of successes $Y = X_1 + X_2 + \cdots + X_n$. The mass function of Y is $f(k) = \binom{n}{k} p^k (1-p)^{n-k}, k = 0,1, \cdots, n$. Here the expecation $\mathbb{E}[Y] = np$ and $Var(Y) = np(1-p)$

- Poisson distribution: A poisson variable is a random variable with the poisson mass function $f(x) = \frac{\lambda^k}{k!} e^{-\lambda}, k = 0,1,2, \cdots$ for some $\lambda > 0$. Both the mean and the variance of the distribution are equal to $\lambda$.

- Geometric distribution: A geometric random variable is a random variable with the geometric mass function $f(k) = p (1-p)^{1-k}, k = 1,2, \cdots$ for some number $p \in (0,1)$. Suppose that independent Bernoulli trials (parameter $p$) are performed $1,2, \cdots, n$ times. Let $W$ be the time which elapses before the first success; $W$ is called a waiting time. Then $\mathbb{P}(W > k) = (1-p)^k$, and thus $\mathbb{P}(W=k) = p(1-p)^{k-1}$. Here the expecation $\mathbb{E}[Y] = p^{-1}$ and $Var(Y) = (1-p)p^{-2}$.


# Continous random variable

A random variable $X$ is continous if its distribution function $F(x) = \mathbb{P}(X \leq x)$ can be written as 
$$
\begin{equation}
F(x) = \int_{- \infty}^{x} f(u)du
\end{equation}
$$
for some integrable $f: \mathbb{R} \rightarrow [0, \infty)$. The distribution of a continous random variable may be specified via its probability density function.

### Definition _(Probability density function)_:
The function $f$ us called the probability density function of the continous random variable $X$. If $F$ is differentiable at $u$ then we shall set $f(u) = F^{`}(u)$.

Some examples of $f$: Let $X$ and $Y$ be two random variables 
- f_{X}(x) = 