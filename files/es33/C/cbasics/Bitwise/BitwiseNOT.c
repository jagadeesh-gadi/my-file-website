#include <stdio.h>
#include "Bitwise.h"
int main()
{
    int a, b;
    printf("enter a and b values :: ");
    scanf("%d%d", &a, &b);

    printf("values of a == %d\t\t \n", a);

    bit_pattern(a);

    printf("values of b == %d\t\t \n", b);

    bit_pattern(b);

    printf("values of ~a == %d\t\t \n", ~a);
    bit_pattern(~a);
    return 0;
}