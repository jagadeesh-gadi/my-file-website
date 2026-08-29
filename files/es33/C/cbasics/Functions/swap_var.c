#include <stdio.h>
int swap(int a, int b)
{
    // a = a + b;
    // b = a - b;
    // a = a - b;
    b=(a*b)/(a=b);
    printf("after swaping value %d ,%d\n", a, b);
}

int main()
{
    int x, y;
    printf("enter values of a and b ::");
    scanf("%d %d", &x, &y);
    swap(x, y);
    return 0;
}