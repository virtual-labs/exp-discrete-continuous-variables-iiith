# Random Variables

There are two important classes of random variables: discrete random variables and continuous random variables.

## Discrete Random Variables

A set $ A $ is countable if either:
- $ A $ is finite, e.g., $ \{1, 2, 3, 4\} $, or
- It can be put in one-to-one correspondence with the natural numbers (countably infinite).

Sets such as $ \mathbb{N} $, $ \mathbb{Z} $, $ \mathbb{Q} $ and their subsets are countable, while nonempty intervals $ [a, b] $ in $ \mathbb{R} $ are uncountable. A random variable is discrete if its range is a countable set. If $ X $ is a discrete random variable, its range $ R_X $ is countable, so we can list its elements:
$$ R_X = \{x_1, x_2, x_3, \ldots\} $$
Here, $ x_1, x_2, x_3, \ldots $ are possible values of $ X $. The event $ A = \{X = x_k\} $ is defined as the set of outcomes $ s $ in the sample space $ S $ for which $ X(s) = x_k $:
$$ A = \{s \in S \mid X(s) = x_k\} $$

The probabilities of events $ \{X = x_k\} $ are given by the probability mass function (PMF) of $ X $.

#### Definition (PMF)
Let $ X $ be a discrete random variable with range $ R_X = \{x_1, x_2, x_3, \ldots\} $ (finite or countably infinite). The function
$$ P_X(x_k) = P(X = x_k), \quad \text{for } k = 1, 2, 3, \ldots, $$
is called the probability mass function (PMF) of $ X $.

The PMF can be extended to all real numbers:
$$ P_X(x) = \begin{cases}
P(X = x) & \text{if } x \in R_X \\
0 & \text{otherwise}
\end{cases} $$

The PMF is a probability measure that satisfies:
- $ 0 \leq P_X(x) \leq 1 $ for all $ x $,
- $ \sum_{x \in R_X} P_X(x) = 1 $,
- For any set $ A \subset R_X $, $ P(X \in A) = \sum_{x \in A} P_X(x) $.

### Independence of Random Variables
Two random variables $ X $ and $ Y $ are independent if:
$$ P(X = x, Y = y) = P(X = x) P(Y = y) \quad \text{for all } x, y. $$

For $ n $ discrete random variables $ X_1, X_2, \ldots, X_n $, they are independent if:
$$ P(X_1 = x_1, X_2 = x_2, \ldots, X_n = x_n) = P(X_1 = x_1) P(X_2 = x_2) \ldots P(X_n = x_n) \quad \text{for all } x_1, x_2, \ldots, x_n. $$

### Types of Discrete Random Variables

#### Bernoulli Distribution
A Bernoulli random variable can take two values, usually 0 and 1, modeling a success/failure experiment.

##### Definition (Bernoulli Distribution)
A random variable $ X $ is Bernoulli with parameter $ p $, denoted $ X \sim \text{Bernoulli}(p) $, if:
$$ P_X(x) = \begin{cases}
p & \text{for } x = 1 \\
1 - p & \text{for } x = 0 \\
0 & \text{otherwise}
\end{cases} $$

#### Geometric Distribution
This models the number of trials until the first success in a series of independent Bernoulli trials.

##### Definition (Geometric Distribution)
A random variable $ X $ is geometric with parameter $ p $, denoted $ X \sim \text{Geometric}(p) $, if:
$$ P_X(k) = \begin{cases}
p(1-p)^{k-1} & \text{for } k = 1, 2, 3, \ldots \\
0 & \text{otherwise}
\end{cases} $$

#### Binomial Distribution
Models the number of successes in $ n $ independent Bernoulli trials.

##### Definition (Binomial Distribution)
A random variable $ X $ is binomial with parameters $ n $ and $ p $, denoted $ X \sim \text{Binomial}(n, p) $, if:
$$ P_X(k) = \begin{cases}
{n \choose k} p^k (1-p)^{n-k} & \text{for } k = 0, 1, 2, \ldots, n \\
0 & \text{otherwise}
\end{cases} $$

#### Poisson Distribution
Models the number of events in a fixed interval of time or space.

##### Definition (Poisson Distribution)
A random variable $ X $ is Poisson with parameter $ \lambda $, denoted $ X \sim \text{Poisson}(\lambda) $, if:
$$ P_X(k) = \begin{cases}
\frac{e^{-\lambda} \lambda^k}{k!} & \text{for } k \in \{0, 1, 2, \ldots\} \\
0 & \text{otherwise}
\end{cases} $$

### Cumulative Distribution Function (CDF)
The CDF of a random variable $ X $ is defined as:
$$ F_X(x) = P(X \leq x) \quad \text{for all } x \in \mathbb{R}. $$

For a discrete random variable $ X $ with range $ R_X = \{x_1, x_2, x_3, \ldots\} $ (with $ x_1 < x_2 < x_3 < \ldots $):
$$ F_X(x) = \sum_{x_k \leq x} P_X(x_k). $$

For all $ a \leq b $:
$$ P(a < X \leq b) = F_X(b) - F_X(a) $$

### Expected Value (Mean)
The expected value of a discrete random variable $ X $ with range $ R_X = \{x_1, x_2, x_3, \ldots\} $ is:
$$ E[X] = \sum_{x_k \in R_X} x_k P_X(x_k). $$

#### Linearity of Expectation
- $ E[aX + b] = aE[X] + b $
- $ E[X_1 + X_2 + \ldots + X_n] = E[X_1] + E[X_2] + \ldots + E[X_n] $

#### Expected Value of a Function (LOTUS)
For a function $ g(X) $:
$$ E[g(X)] = \sum_{x_k \in R_X} g(x_k) P_X(x_k) $$

### Variance
Variance measures the spread of a random variable around its mean. For $ EX = \mu_X $:
$$ \text{Var}(X) = E[(X - \mu_X)^2] = \sum_{x_k \in R_X} (x_k - \mu_X)^2 P_X(x_k) $$

#### Standard Deviation
$$ \text{SD}(X) = \sigma_X = \sqrt{\text{Var}(X)} $$

#### Computational Formula for Variance
$$ \text{Var}(X) = E[X^2] - (E[X])^2 $$

#### Variance of a Linear Transformation
For $ a, b \in \mathbb{R} $:
$$ \text{Var}(aX + b) = a^2 \text{Var}(X) $$

#### Variance of the Sum of Independent Variables
For independent $ X_1, X_2, \ldots, X_n $:
$$ \text{Var}(X) = \text{Var}(X_1) + \text{Var}(X_2) + \ldots + \text{Var}(X_n) $$

## Continuous Random Variables

Random variables with a continuous range of possible values are common. For example, the exact velocity of a vehicle on a highway is a continuous random variable. The CDF of a continuous random variable is a continuous function, meaning it does not have jumps. This aligns with the fact that $ P(X = x) = 0 $ for all $ x $.

#### Definition (CDF)
A random variable $ X $ with CDF $ F_X(x) $ is continuous if $ F_X(x) $ is a continuous function for all $ x \in \mathbb{R} $. We also assume that the CDF is differentiable almost everywhere in $ \mathbb{R} $.

### Probability Density Function (PDF)
For continuous random variables, the PMF does not apply as $ P(X = x) = 0 $ for all $ x \in \mathbb{R} $. Instead, we use the PDF, which gives the density of probability at a point.

$$ f_X(x) = \lim_{\Delta \rightarrow 0^+} \frac{P(x < X \leq x + \Delta)}{\Delta} $$

The function $ f_X(x) $ gives the probability density at point $ x $. It is defined as:

$$ f_X(x) = \frac{dF_X(x)}{dx} = F'_X(x), \quad \text{if } F_X(x) \text{ is differentiable at } x $$

A random variable $ X $ is continuous if there is a non-negative function $ f_X $, called the probability density function (PDF), such that:

$$ \mathbb{P}(X \in B) = \int_B f_X(x) \, dx $$

For every subset $ B $ of the real line, the probability of $ X $ falling within an interval $ [a, b] $ is:

$$ \mathbb{P}(a \leq X \leq b) = \int_a^b f_X(x) \, dx $$

This can be interpreted as the area under the graph of the PDF. For any single value $ a $:

$$ \mathbb{P}(X = a) = 0 $$

Thus:

$$ P(a \leq X \leq b) = P(a < X < b) = P(a \leq X < b) = P(a < X \leq b) $$

A function $ f_X $ must be non-negative and satisfy:

$$ \int_{-\infty}^{\infty} f_X \, dx = 1 $$

#### Definition (PDF)
Consider a continuous random variable $ X $ with an absolutely continuous CDF $ F_X(x) $. The function $ f_X(x) $ defined by:

$$ f_X(x) = \frac{dF_X(x)}{dx} = F'_X(x), \quad \text{if } F_X(x) \text{ is differentiable at } x $$

is the probability density function (PDF) of $ X $. For small values of $ \delta $:

$$ P(x < X \leq x + \delta) \approx f_X(x) \delta $$

If $ f_X(x_1) > f_X(x_2) $:

$$ P(x_1 < X \leq x_1 + \delta) > P(x_2 < X \leq x_2 + \delta) $$

Thus, $ X $ is more likely to be around $ x_1 $ than $ x_2 $.

The CDF can be obtained from the PDF by integration:

$$ F_X(x) = \int_{-\infty}^{x} f_X(u) \, du $$

And:

$$ P(a < X \leq b) = F_X(b) - F_X(a) = \int_{a}^{b} f_X(u) \, du $$

### Properties of the PDF

- $ f_X(x) \geq 0 $ for all $ x \in \mathbb{R} $
- $ \int_{-\infty}^{\infty} f_X(u) \, du = 1 $
- $ P(a < X \leq b) = \int_{a}^{b} f_X(u) \, du $
- For any set $ A $, $ P(X \in A) = \int_A f_X(u) \, du $

### Range of a Continuous Random Variable
The range $ R_X $ of a continuous random variable $ X $ is:

$$ R_X = \{ x \mid f_X(x) > 0 \} $$

### Expected Value
The expected value of a continuous random variable $ X $ is:

$$ EX = \int_{-\infty}^{\infty} x f_X(x) \, dx $$

### Expected Value of a Function (LOTUS)
For a function $ g(X) $:

$$ E[g(X)] = \int_{-\infty}^{\infty} g(x) f_X(x) \, dx $$

### Linearity of Expectation

- $ E[aX + b] = aEX + b $
- $ E[X_1 + X_2 + \cdots + X_n] = EX_1 + EX_2 + \cdots + EX_n $

### Variance
The variance of a continuous random variable $ X $ is:

$$ \textrm{Var}(X) = E[(X - \mu_X)^2] = EX^2 - (EX)^2 $$

So:

$$ \textrm{Var}(X) = \int_{-\infty}^{\infty} (x - \mu_X)^2 f_X(x) \, dx = EX^2 - (EX)^2 $$

For $ a, b \in \mathbb{R} $:

$$ \textrm{Var}(aX + b) = a^2 \textrm{Var}(X) $$

If $ X $ is continuous and $ Y = g(X) $, then $ Y $ is also a random variable. To find the CDF and PDF of $ Y $, start from the CDF and then differentiate.

### Uniform Random Variable
A continuous random variable $ X $ is uniformly distributed over $ [a, b] $, denoted $ X \sim \text{Uniform}(a, b) $, if:

$$ f_X(x) = \begin{cases}
\frac{1}{b-a} & a < x < b \\
0 & \text{otherwise}
\end{cases} $$

The CDF and mean are:

$$ F_X(x) = \begin{cases}
0 & x < a \\
\frac{x - a}{b - a} & a \leq x < b \\
1 & x \geq b
\end{cases} $$

$$ EX = \frac{a + b}{2} $$

The variance is:

$$ \textrm{Var}(X) = \frac{(b - a)^2}{12} $$

### Exponential Random Variable
The exponential distribution models the time between events. A continuous random variable $ X $ is exponentially distributed with parameter $ \lambda > 0 $, denoted $ X \sim \text{Exponential}(\lambda) $, if:

$$ f_X(x) = \begin{cases}
\lambda e^{-\lambda x} & x > 0 \\
0 & \text{otherwise}
\end{cases} $$

The CDF, mean, and variance are:

$$ F_X(x) = 1 - e^{-\lambda x} $$

$$ EX = \frac{1}{\lambda} $$

$$ \textrm{Var}(X) = \frac{1}{\lambda^2} $$

The exponential distribution is memoryless:

$$ P(X > x + a \mid X > a) = P(X > x) $$

### Normal Distribution
The Central Limit Theorem (CLT) states that the sum of a large number of random variables is approximately normal. A standard normal random variable $ Z $ is denoted $ Z \sim N(0, 1) $ and has PDF:

$$ f_Z(z) = \frac{1}{\sqrt{2\pi}} \exp\left\{ -\frac{z^2}{2} \right\} $$

The mean and variance are:

$$ EZ = 0 $$
$$ \textrm{Var}(Z) = 1 $$

The CDF is:

$$ F_Z(z) = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{z} \exp\left\{ -\frac{u^2}{2} \right\} \, du $$

The CDF of any normal random variable can be written in terms of the standard normal CDF, denoted $ \Phi $:

$$ \Phi(x) = \frac{1}{\sqrt{2 \pi}} \int_{-\infty}^{x} \exp\left\{ -\frac{u^2}{2} \right\} \, du $$

Properties of $ \Phi $:

- $ \lim_{x \rightarrow \infty} \Phi(x) = 1 $
- $ \lim_{x \rightarrow -\infty} \Phi(x) = 0 $
- $ \Phi(0) = \frac{1}{2} $
- $ \Phi(-x) = 1 - \Phi(x) $

A normal random variable $ X $ with mean $ \mu $ and variance $ \sigma^2 $ is denoted $ X \sim N(\mu, \sigma^2) $. If $ Z $ is standard normal and $ X = \sigma Z + \mu $:

$$ X \sim N(\mu, \sigma^2) $$

The CDF and PDF of $ X $ are:

$$ F_X(x) = \Phi\left( \frac{x - \mu}{\sigma} \right) $$

$$ f_X(x) = \frac{1}{\sigma \sqrt{2 \pi}} \exp\left\{ -\frac{(x - \mu)^2}{2\sigma^2} \right\} $$

For a linear transformation $ Y = aX + b $:

$$ Y \sim N(a\mu_X + b, a^2 \sigma_X^2) $$