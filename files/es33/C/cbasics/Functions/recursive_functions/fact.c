#include <stdio.h>

int count = 0;

int fun(int n)
{
    if (n == 0)
        return 1;

    printf("Calling factorial of %d\n", n);
    count++;

    return (n * fun(n - 1));
}

int main()
{
    int n;
    scanf("%d", &n);

    int result = fun(n);
    printf("Number of recursive calls: %d\n", count);
    printf("factorail of %d is %d\n", n, result);

    return 0;
}
