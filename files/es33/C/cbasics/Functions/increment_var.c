#include <stdio.h>
void increment(int x)
{
    scanf("%d", &x);
    x++;
    printf("in function :: %d\n", x);
}

int main()
{
    int a;
    increment(a);
    printf("main function :: %d\n ", a);
    return 0;
}