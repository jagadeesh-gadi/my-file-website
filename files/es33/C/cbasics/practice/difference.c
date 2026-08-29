// Write a program to demonstrate the difference between:
// ++i
// i++
// --i
// i--

#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);
    printf("pre inc :: %d \n", ++n);
    printf("post inc :: %d ,%d  \n", n++, ++n);
    printf("%d\n", n);
    printf("pre dec :: %d \n", --n);
    printf("post dec :: %d \n", n--);

    // Write a program to demonstrate operator precedence using at least five operators.
    printf("fivvest :: %d  %d  %d  %d  %d\n", ++n, --n, n++, n--, --n);
    return 0;
}