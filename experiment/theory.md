There are two important classes of random variables: discrete random variables and continuous random variables.

### Discrete Random Variable

A random variable is called discrete if its range (the set of values that it can take) is finite or at most countably infinite. A random variable that can take an uncountably infinite number of values is not discrete. For an example, consider the experiment of choosing a point _a_ from the interval [−1, 1]. The random variable that associates the numerical value $X(a) = a^2$ to the outcome _a_ is not discrete since the range is [0, 1]. On the other hand, the random variable that associates with _a_ the numerical value

$$
X(a) =
\begin{cases}
1, & a > 0 \\
0, & a = 0 \\
-1, & a < 0
\end{cases}
\tag{6.2}
$$

is discrete.

For a discrete random variable $X$, we define the probability mass function (pmf) of $X$ by

$$
p_X(a) = P(X = a) = P(\{\omega | X(\omega) = a\}).
$$

Note that $p_X(.)$ is a valid pmf if and only if the following condition is satisfied.

$$
\sum_{I=1}^{\infty} p_X(x_I) = 1,
$$

where $\{x_1, x_2, \dots, \}$ is the range of the random variable $X$.

The CDF of a random variable $ X $ is defined as:

$$
F_X(x) = P(X \leq x) \quad \text{for all } x \in \mathbb{R}.
$$

For a discrete random variable $ X $ with range $ R_X = \{x_1, x_2, x_3, \ldots\} $ (with $ x_1 < x_2 < x_3 < \ldots $):

$$
F_X(x) = \sum_{x_k \leq x} P_X(x_k).
$$

#### Types of Discrete Random Variables

##### Bernoulli Random Vadriable

Consider the toss of a biased coin, which comes up a head with probability $p$, and a tail with probability $1 − p$. The Bernoulli random variable takes the two values 1 and 0, depending on whether the outcome is a head or a tail:

$$
X(T) = 0, \quad X(H) = 1.
$$

The probability mass function (pmf) of the Bernoulli random variable is given by

$$
p_X(0) = 1 - p, \quad p_X(1) = p.
$$

The cumulative distribution function (cdf) of the Bernoulli random variable is given by

$$
F_X(x) =
\begin{cases}
0, & x < 0 \\
1 - p, & 0 \le x < 1 \\
1, & x \ge 1
\end{cases}
$$

##### Binomial Random Variable

A biased coin is tossed _n_ times. At each toss, the coin comes up a head with probability $p$, and a tail with probability $1-p$, independently of prior tosses. The sample space is given by the set of all $2^n$ possible tuples

of H, T combinations. For the case of _n_ = 4, the sample space is as given below:

$$
\Omega = \{TTTT, TTTH, TTHT, TTHH, THTT, THTH, THHT, THHH, HTTT, HTTH, HTHT, HTHH, HHTT, HHTH, HHHT, HHHH\}.
$$

For any $\omega \in \Omega$, $X(\omega)$ is defined as the number of heads in $\omega$. The range of values which the random variable $X$ takes is $\{0, 1, \dots, n\}$. The probability mass function (pmf) of the random variable $X$ is given by

$$
p_X(k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad 0 \le k \le n
$$

This random variable is known as binomial random variable. Note that the above pmf is a valid pmf as it sums to 1.

$$
\sum_{k=0}^{n} p_X(k) = \sum_{k=0}^{n} \binom{n}{k} p^k (1-p)^{n-k} = (p + (1-p))^n = 1.
$$

##### Geometric Random Variable

Suppose that we repeatedly and independently toss a biased coin with probability of a head $p$, where $0 < p < 1$ till a head comes up for the first time. The sample space corresponding to the experiment is given by

$$
\Omega = \{H, TH, TTH, TTTH, \dots\}.
$$

For any $\omega \in \Omega$, $X(\omega)$ is defined as the number of tosses in $\omega$. The range of values which the random variable $X$ takes is $\{1, 2, \dots, \}$. The probability mass function (pmf) of the random variable $X$ is given by

$$
p_X(k) = (1-p)^{k-1}p, \quad k \in \{1, 2, \dots\}.
$$

This random variable is known as geometric random variable. Note that the above pmf is a valid pmf as it sums to 1.

$$
\sum_{k=1}^{\infty} p_X(k) = \sum_{k=1}^{\infty} (1-p)^{k-1}p = p \sum_{k=0}^{\infty} (1-p)^k = p \frac{1}{1-(1-p)} = 1.
$$

##### Poisson Random Variable

A poisson random variable takes nonnegative integer values. Its pmf is given by

$$
p_X(k) = \frac{e^{-\lambda} \lambda^k}{k!}, \quad k = 0, 1, 2, \dots
$$

Note that the above pmf is a valid pmf as it sums to 1.

$$
\sum_{k=0}^{\infty} p_X(k) = e^{-\lambda} \sum_{k=0}^{\infty} \frac{\lambda^k}{k!} = e^{-\lambda} e^{\lambda} = 1.
$$

An important property of the Poisson random variable is that it may be used to approximate a binomial random variable when the binomial parameter _n_ is large and _p_ is small.

### Continuous Random Variables

Random variables with a continuous range of possible values are common. For example, the exact velocity of a vehicle on a highway is a continuous random variable. The CDF of a continuous random variable is a continuous function, meaning it does not have jumps. This aligns with the fact that $ P(X = x) = 0 $ for all $ x $.

For a continuous random variable $X$, the probability of it taking any single value is zero, so we use a **Probability Density Function (PDF)**, denoted $f_X(x)$, to describe its distribution.

The PDF is defined as the derivative of the Cumulative Distribution Function (CDF), $F_X(x)$, where the derivative exists:

$$
f_X(x) = \frac{dF_X(x)}{dx}
$$

The probability that $X$ falls within an interval $[a, b]$ is the integral of the PDF over that interval:

$$
\mathbb{P}(a \leq X \leq b) = \int_a^b f_X(x) \, dx
$$

A valid PDF must satisfy two conditions: $f_X(x) \geq 0$ for all $x$, and its total integral must be one, $\int_{-\infty}^{\infty} f_X(x) \, dx = 1$.

Conversely, the CDF can be obtained from the PDF by integrating from negative infinity up to a point $x$:

$$
F_X(x) = \mathbb{P}(X \leq x) = \int_{-\infty}^{x} f_X(u) \, du
$$

#### Types of Continuous Random Variable

##### Uniform Random Variable

A continuous random variable $ X $ is uniformly distributed over $ [a, b] $, denoted $ X \sim \text{Uniform}(a, b) $, if:

$$
f_X(x) = \begin{cases}
\frac{1}{b-a} & a < x < b \\
0 & \text{otherwise}
\end{cases}
$$

The CDF is:

$$
F_X(x) = \begin{cases}
0 & x < a \\
\frac{x - a}{b - a} & a \leq x < b \\
1 & x \geq b
\end{cases}
$$

##### Exponential Random Variable

The exponential distribution models the time between events. A continuous random variable $ X $ is exponentially distributed with parameter $ \lambda > 0 $, denoted $ X \sim \text{Exponential}(\lambda) $, if:

$$
f_X(x) = \begin{cases}
\lambda e^{-\lambda x} & x > 0 \\
0 & \text{otherwise}
\end{cases}
$$

The CDF is:

$$
F_X(x) = 1 - e^{-\lambda x}
$$

##### Normal Distribution

The Central Limit Theorem (CLT) states that the sum of a large number of random variables is approximately normal. A standard normal random variable $ Z $ is denoted $ Z \sim N(0, 1) $ and has PDF:

$$
f_Z(z) = \frac{1}{\sqrt{2\pi}} \exp\left\{ -\frac{z^2}{2} \right\}
$$

The CDF is:

$$
F_Z(z) = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{z} \exp\left\{ -\frac{u^2}{2} \right\} \, du
$$
