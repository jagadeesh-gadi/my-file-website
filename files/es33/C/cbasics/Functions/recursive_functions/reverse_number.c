#include <stdio.h>
int reverse(int n, int rev)
{

    if (n == 0)
        return rev;

    return reverse(n / 10, rev * 10 + n % 10);
}
int main()
{
    int n, result;
    scanf("%d", &n);
    result = reverse(n, 0);
    printf("%d\n", result);
    return 0;
}