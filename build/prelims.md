# Set theory :
A set is a collection of well defined objects, either concrete or abstract. In the study of probability we are particularly interested in the set of all outcomes of a random experiment and its subsets.

### Definition 1 *(Union of sets)* :
_The Union of two sets $E \; \& \; F$ is the set of all elements that are in atleast one of the sets $E$ or $F$._

$E \bigcup F = \{ x : x \in E \text{ or } x \in F\}$

### Definition 2 *(Intersection of sets)* :
_The Intersection of two sets $E \; \& \; F$ is the set of all elements that are common to both sets $E$ and $F$._

$E \bigcap F = \{ x : x \in E \text{ and } x \in F\}$

### Definition 3 *(Compliment of a set)* :
_The Compliment of a set $E$ with respect to a universe $\Omega$ is the set of all elements that are not in $E$._

$E^{C} = \{ x : x \in \Omega \text{ and } x \notin E\}$, where $\Omega = $ Universe 

### Definition 4 *(Difference of two sets)* :
_The difference of two sets $E \; \& \; F$ is the set of all elements that are in $E$ but not in $F$. It is denoted by $E - F$ or $E \backslash F$._

$E \backslash F = \{ x : x \in \Omega \text{ and } x \notin F\}$ 

### Definition 5 *(Exclusive-or of two sets)* : 
_The Exclusive-or of two sets $E \; \& \; F$ is the set of all elements that are either in $E$ or in $F$ but not in both. It is defined as_
$$
\begin{align*}
    E \oplus F = (E-F) \cup (F-E)
\end{align*}
$$

### Definition 6 *(DeMorgan's laws)* :
_For any two sets $E \; \& \; F$,_

- $(E \cup F)^{C} = E^{C} \cap F^{C}$

- $(E \cap F)^{C} = E^{C} \cup F^{C}$

### Definition 7 *(Partition of a set)* :
_Given any set $E$, an $n-$partition of a $E$ consists of a sequence of sets_ $E_i$, $i$ = 1, 2, 3, $\cdots$, n _such that_
$$
\begin{align*}
E_i \subseteq E , \; \bigcup_{i=1}^{n} E_i = E, \; \& \; E_i \cap E_j = \phi, \; \forall i \neq j
\end{align*}
$$ 

### Definition 8 *(Equality of sets)* :
_Two sets $E \; \& \; F$ are said to be equal if every element of in $E$ is in $F$ and vice versa._
$$
\begin{align*}
E = F \text{ if } E \subseteq F \; \& \; F \subseteq E
\end{align*}
$$ 

### Definition 9 *(Disjoint sets)* :
_Two sets $E \; \& \; F$ are said to be disjoint if $E \cap F = \phi$._

# Probability :
Probability theory is a mathematical framework that allows us to describe and analyze a random experiment whose outcomes we cannot predict with certainity. It helps us to predict how likely or unlikely an event of interest will occur. Let $A$ be an event, and the chance of $A$ occuring is $p$. The occurrence or non occurence of $A$ depends upon a chain of circumstances involved. This chain is called an experiment of trial. The result of the experiment is called its outcome.

Any experiment involving randomness can be modelled as a probability space. A probability space is a mathematical model of a random experiment. The space comprises of
- $\Omega$ (Sample space): Set of possible outcomes of the experiment
- $\mathcal{F}$ (Signma algebra) : Set of events
- $\mathbb{P}$ (Probability measure)

### Definition 1 *(Sample space)* :
The set of all possible outcomes of an experiment is called the sample space, denoted by $\Omega$.

**_Example 1 :_** In the scenario of a coin being tossed, $\Omega = \{ H, T\}$

**_Example 2 :_** In the scenario of a dice being rolled, $\Omega = \{ 1, 2, 3, 4, 5, 6\}$

An event can be defined as a subset of the appropriate sample space $\Omega$. If $\Omega = \{ H, T\}$, then an event $A$ cab be $\{H\}$ or $\{H\}^{C}$ or $\{H\} \cap \{T\}$ or else if   $\Omega = \{ 1, 2, 3, 4, 5, 6 \}$, then $A$ can be $\{2, 4, 6\}$ or $\{1, 2, 3\}$ or $\{2\}^{C}$.

- $\phi$ is said to be the **impossible event**
- $\Omega$ is said to be the **certain event** since some member of $\Omega$ will ceetainly occur.

All the subsets of $\Omega$ need not be events. 

### Definition 2 _(Field / Sigma Algebra)_ :
A collection of events, as a subcollection $\mathcal{F}$ of the set of all subsets of $\Omega$, which satisfy the following properties
1. If $A \; \& \; B \in \mathcal{F}$, then $A \cup B \in \mathcal{F}
2. If $A \in \mathcal{F}$, then $A^{C} \in \mathcal{F}$
3. $\phi \in \mathcal{F}$ 

is called as a Field. From the definition of a Field, if $A_i, A_2, \cdots, A_n \in \mathcal{F}$, then $\bigcup_{i=1}^{n}A_i \in \mathcal{F}$. $\mathcal{F}$ is closed under finite unions and finite intersections also.

When $\Omega$ is infinite, we define $\sigma$- field $\mathcal{F}$ by modifiying (1) as
- If $A_1, A_2, \cdots \in \mathcal{F}$, then $\bigcup_{i=1}^{\infty}A_i \in \mathcal{F}$

Every experiment is associated with a pair $(\Omega, \mathcal{F} )$. We call $A$  to be an event of the experiment if $A \in \mathcal{F}$

### Definition 3 _(Probability measure)_ :
A probability measure $\mathbb{P}$ on $(\Omega, \mathcal{F} )$ is a function $\mathbb{P} : \mathcal{F} \to [0, 1]$ satisfying 
1. $\mathbb{P}(\Omega) = 1$
2. If $A_1, A_2, \cdots$ is a collection of disjoint members of $\mathcal{F}$, in that $A_i \cap A_j = \phi$ for all pairs $i, j$ satisfying $i \neq j$ then  

$$\begin{align*}
\mathbb{P} ( \bigcup_{i = 1}^{\infty} A_i ) = \sum_{i = 1}^{\infty} \mathbb{P}(A_i)
\end{align*}
$$.

This triple $(\Omega, \mathcal{F}, \mathbb{P})$ is called as a probability space.

**_Example 3_ :**
A coin, possibly biased, is tossed once. We can take $\Omega = \{H, T\}$ and $\mathcal{F} = \{\phi, \Omega, H, T\}$. A possible probability measure $ \mathbb{P} : \mathcal{F} \to [0, 1]$ is given by

- $\mathbb{P}(\phi) = 0$
- $\mathbb{P}(\Omega) = 1$
- $\mathbb{P}(H) = p$
- $\mathbb{P}(T) = 1-p$
where $p \in [0,1]$. If p = 0.5, then we can say that the coin is fair.

### Important properties of a typical probability space :
- $\mathbb{P}(A^{C}) = 1- \mathbb{P}(A)$
- If $B \subseteq A $, then $\mathbb{P}(B) = \mathbb{P}(A) + \mathbb{P}(B|A) \geq  \mathbb{P}(A)$
- $\mathbb{P}(A \cup B) =\mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B) $
- More generally, if $A_1, A_2, \cdots, A_n$ are events, then 

$$
\begin{align*}
    \mathbb{P}( \bigcup_{i=1}^{n}  A_i) = \sum_{i} \mathbb{P}(A_i) - \sum_{i<j}\mathbb{P}(A_i \cap A_j) + \sum_{i<j<k}\mathbb{P}(A_i \cap A_j \cap A_k) \cdots + (-1)^n+1 \mathbb{P}(A_1 \cap A_2 \cap A_3 \cdots \cap A_n) 
\end{align*}
$$, where, for Example, $\sum_{i<j}$ sums over all unordered pairs $(i,j)$ with $i \neq j$.

An event $A$ is called null event if $\mathbb{P}(A) = 0$, and if $\mathbb{P}(A) = 1$, we say that the event A occurs almost surely. Null events should not be confused with the impossible event $\phi$. Impossible event is null, but null events need not be impossible.

### Conditional probability :
An experiment is repeated $N$ times, and on each occasion we observe the occurrences (or non occurrences) of two events $A$ and $B$. We observe that the probabilty that $A$ occurs given $B$ occurs should be reasonably defined as 
$$\begin{align*}
\frac{\mathbb{P}(A \cap B)}{\mathbb{P}(B)}
\end{align*}
$$ 

Probabilistic intuition also leads to the same conclusion. Given that event $B$ occurs, if it is the case that event $A$ occurs if and only $\mathbb{P}(A \cap B)$ occurs. The conditional probability of $A$ given $B$ should be proportional to $\mathbb{P}(A \cap B)$.

- $\mathbb{P}(A|B)  = \alpha \mathbb{P} (A \cap B)  $ for some const $\alpha$
- The conditional property of $\Omega$ given $B$ must be equal to $1$
- Thus $\alpha \mathbb{P} (\Omega \cap B) = 1$
- $\Rightarrow \alpha \mathbb{P} (B) = 1$
- $\Rightarrow \alpha = \frac{1}{\mathbb{P} (B)} $

### Definition 4 _(Conditional Probability)_ :
If $\mathbb{P}(B) > 0$, then the conditional probability that $A$ occurs given that $B$ occurs is defined as
$$
\begin{align*}
\mathbb{P}(A|B) = \frac{\mathbb{P}(A \cap B)}{\mathbb{P}(B)}
\end{align*}
$$

## Independence
In general, the occurence of some event $B$ changes the probability that another event $A$ occurs. Where the original probability $\mathbb{P}(A)$ being replaced by $\mathbb{P}(A|B)$. If the original probability remains unchanged, then we say that the two events $A \; \& \; B$ are independent. 

$$
\begin{align*}
\mathbb{P}(A|B) =\mathbb{P}(A|B)
\end{align*}
$$

### Definition 5 _(Independence)_ :
Events $A \; \& \; B$ are called independent events if $\mathbb{P}(A \cap B) =  \mathbb{P}(A) * \mathbb{P}(B)$. More generally, a family of events defined as $\{A_i : i \in I\}$ are independent if 
$$
\begin{align*}
\mathbb{P}(\bigcap_{i \in J}^{}) = \prod_{i \in J} \mathbb{P}(A_i)
\end{align*}
$$, for all finite subsets $J$ of $I$.

Common mistake : If $A \; \& \; B$ are independent, then we assume that $A \cap B = \phi$. This is the case when $A \; \& \; B$ are mutually independent not when $A \; \& \; B$ are independent.

If the family of events $\{A_i : i \in I\}$ has the property that $\mathbb{P}( A_i\cap A_j) = \mathbb{P}(A_i) * \mathbb{P}(A_j) \forall i \neq j$ then it is called pairwaise independent set of events. Let $C$ be an event with $\mathbb{P}(C) > 0$, then the two events $A \; \& \; B$ are called conditionally independent given $C$ if 

$$
\begin{align*}
\mathbb{P}(A \cap B|C) =\mathbb{P}(A|C) * \mathbb{P}(B|C)
\end{align*}
$$

## Completeness
Let $(\Omega, \mathcal{F}, \mathbb{P})$ be a probability space. Any event $A$ which has zero probability, that is $\mathbb{P}(A) = 0$, is called a null event. It may seem reasonable that any subset $B \subseteq A$ will itself be null, but this may be without meaning since $B$ may not be an event, this $\mathbb{P}(B)$ may not be defined.

### Definition _(Complete Space)_ :
A probability space $(\Omega, \mathcal{F}, \mathbb{P})$ is called a complete space if all subsets of null sets are events.