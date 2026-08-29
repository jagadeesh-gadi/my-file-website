#include <stdio.h>

int even(int b)
{
    if (b % 2 == 0)
    {
        printf("number is even number \n");
    }
    else
    {
        printf("number is odd number \n");
    }
}
int main()
{
    int a;
    printf("enter a values :: ");
    scanf("%d", &a);
    even(a);
    return 0;
}