#include <stdio.h>
int findmax(int a, int b)
{
    if (a > b)
    {
        return a;
    }
    else
    {
        return b;
    }
}
int main()
{
    int x, y;
    scanf("%d%d", &x, &y);
    int z = findmax(x, y);
    printf("largest number is ::%d\n", z);
    return 0;
}