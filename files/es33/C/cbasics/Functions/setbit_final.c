// find the right most set bit and clear that bit and print the final value
#include <stdio.h>

int rightmost(int n)
{
    int z;

    z = n & (-n);
    n = n & (n - 1);

    return n;
}

int main()
{
    int x;

    scanf("%d", &x);

    x = rightmost(x);

    printf("Final value = %d\n", x);

    return 0;
}