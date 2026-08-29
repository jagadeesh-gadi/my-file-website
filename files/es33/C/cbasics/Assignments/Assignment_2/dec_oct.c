#include<stdio.h>

int main()
{
    int i, a[20], n;
    scanf("%d", &n);
    while (n > 0)
    {
        a[i++] = n % 8;
        n /= 8;
    }
    for (int j = i - 1; j >= 0; j--)
    {
        printf("%d",a[j]);
    }
    printf("\n");
    return 0;
}
