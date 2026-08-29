#include <stdio.h>
void number(int n)
{
    if (n == 0)
        return;
    printf("numbers are :%d\n", n);
    number(n - 1);
}
int main()
{
    int n;
    scanf("%d", &n);
    number(n);
    return 0;
}