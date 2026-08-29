// write a program to check the value is power of 2 or not
#include <stdio.h>
static inline int power(unsigned int n)
{
    return (n != 0) && (n & (n - 1) == 0);
}
int main()
{
    unsigned int num;
    scanf("%d", &num);
    if (power(num))
    {
        printf("%d is power of 2", num);
    }
    else
    {
        printf("%d is not power of 2 ", num);
    }

    return 0;
}