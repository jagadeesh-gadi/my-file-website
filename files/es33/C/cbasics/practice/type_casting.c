// Read two integers and calculate their exact division using type casting.
#include <stdio.h>

int main()
{
    int a, b;

    scanf("%d%d", &a, &b);
    float result = (float)a / b;
    printf("%f\n", result);

    // explict type casting
    float r = (float)a;
    printf("%f\n", r);
    int n = (int)r;
    printf("%d\n", n);
    return 0;
}
