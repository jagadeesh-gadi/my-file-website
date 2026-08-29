// Calculate the average of five integers without losing the decimal part.
#include <stdio.h>

int main()
{
    int n, i, sum = 0;
    float averge;
    for (i = 1; i <= 5; i++)
    {
        scanf("%d", &n);
        sum = sum + n;
    }
    averge = (float)sum / 5;
    printf("%f\n", averge);
    return 0;
}