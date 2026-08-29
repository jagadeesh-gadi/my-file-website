#include <stdio.h>
int rescur(int n)
{
    if (n == 0)
        return 0;

    return n + rescur(n - 1);
}

int main()
{
    int n;
    scanf("%d", &n);

    printf("%d\n", rescur(n));
    return 0;
}
