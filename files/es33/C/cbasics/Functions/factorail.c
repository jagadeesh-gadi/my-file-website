#include <stdio.h>
int factroial(int n)
{
    int i, fact = 1;
    for (i = 1; i <= n; i++)
    {
        fact *= i;
    }
    return fact;
}

int main()
{
    int x;
    int z, i;
    scanf("%d", &x);
    for (i = 1; i <= x; i++)
    {
        z = factroial(i);
        printf("factroil  of :: %d ==  %d\n", i, z);
    }
    return 0;
}