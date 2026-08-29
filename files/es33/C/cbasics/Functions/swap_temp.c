#include <stdio.h>

void swap(int a, int b)
{
    int temp;
    temp = a;
    a = b;
    b = temp;
    printf("after swapping :: %d %d\n", a, b);
}
int main()
{
    int x, y;
    scanf("%d%d", &x, &y);
    swap(x, y);
    return 0;
}