#include <stdio.h>

#include "Bitwise.h"

int main()
{

    int a, b;
    printf("enter a ,b values :: ");
    scanf("%d%d", &a, &b);

    printf("value of a == %d\t\t \n", a);
    bit_pattern(a);
    printf("value of b == %d\t\t \n", b);
    bit_pattern(b);
    printf("value of a | b == %d\t\t \n", a | b);
    bit_pattern(a | b);

    return 0;
}