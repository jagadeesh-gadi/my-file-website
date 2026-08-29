// Calculate the result of:
// a + b * c - d / e
// and observe operator precedence.

#include <stdio.h>

int main()
{
    int a, b, c, d, e;
    scanf("%d%d%d%d%d", &a, &b, &c, &d, &e);
    int sum = 0;
    sum = a + b * c - d / e;
    printf("total :: %d\n", sum);
    return 0;
}