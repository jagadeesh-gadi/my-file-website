// #include <stdio.h>
// int power(int x, int n)
// {
//     if (n == 0)
//         return 1;

//     return x * power(x, n - 1);
// }
// int main()
// {
//     int x, n;
//     printf("enter base and power values ::");
//     scanf("%d%d", &x, &n);
//     printf("%d^%d = %d\n", x, n, power(x, n));

//     return 0;
// }

#include <stdio.h>
int power(int n)
{
    if (n == 0)
        return 0;
    if (n <= 0 || n % 2 != 0)
        return 1;

    return power(n / 2);
}
int main()
{
    int n;
    scanf("%d", &n);

    if (power(n))
        printf("%d is a power of 2\n", n);
    else
        printf("%d is not a power of 2\n", n);

    return 0;
}