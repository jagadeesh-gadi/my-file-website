#include <stdio.h>

int main()
{
    int a, b, c;
    scanf("%d%d%d", &a, &b, &c);
    printf("res1 == %d\n", (a < b) && (b > c));
    printf("res2 == %d\n", (a > b) || (c < b));
    printf("res3 == %d\n", !(a == c));
    return 0;
}