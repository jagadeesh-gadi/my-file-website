#include <stdio.h>
int num;
int reverse()
{
    int rev = 0, digit;
    while (num > 0)

    {
        digit = num % 10;
        rev = rev * 10 + digit;
        num /= 10;
    }

    printf("after reverse a number ::%d", rev);
}
int main()
{
    int j;
    printf("enter a number to reverse :: ");
    scanf("%d", &j);
    reverse(j);

    return 0;
}