#include <stdio.h>

void fib(int n, int k)
{
    int i, a = 0, b = 1, c;

    for (i = 1; i <= n; i++)
    {
        printf("all the series :: %d is  :: %d\n", i, a);

        c = a + b;
        a = b;
        b = c;
        if (i == k)
        {
            printf("Nth term value ::  %d is %d\n", i, a);
        }
    }
}
int main()
{
    int n, k;

    printf("Enter number of terms: ");
    scanf("%d", &n);

    printf("Find nth term: ");
    scanf("%d", &k);
    fib(n, k);
    return 0;
}