#include <stdio.h>
int sum_digits(int a)
{
    int num, sum = 0;
    while (a > 0)
    {
        num = a % 10;
        sum = sum + num;
        a /= 10;
    }
    printf("sum of all digits are ::%d\n", sum);
}
int main()
{
    int s;
    printf("enter sum of digits :: ");
    scanf("%d", &s);
    sum_digits(s);

    return 0;
}