#include <stdio.h>

int main()
{
    int n, i, a[30];
    scanf("%d", &n);
    // printf("%d\n",n);

    while (n > 0)
    {
        a[i++] = n % 2;
        n /= 2;
        // printf("%d",a[i]);
    }
    for (i = i - 1; i >= 0; i--)
    {
        printf("%d", a[i]);
    }
    printf("\n");
    return 0;
}