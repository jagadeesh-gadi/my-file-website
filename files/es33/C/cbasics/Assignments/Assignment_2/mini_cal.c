#include <stdio.h>

int main()
{
    int a, b,f;
    char op;
    // float f;
    printf("enter a value\n");
    scanf("%d",&a);
    printf("enter operators (+,-,*,/)\n");
    scanf(" %c",&op);
    printf("enter b values\n");
    scanf("%d", &b);

    switch (op)
    {
    case '+':
        printf("addition of 2 number are %d, %d ,%d\n", a, b, f = a + b);
        break;
    case '-':
        printf("subtraction of 2 number are %d, %d ,%d\n", a, b, f = a - b);
        break;
    case '*':
        printf("multiplicatin of 2 number are %d, %d ,%d\n", a, b, f = a * b);
        break;
    case '/':
        printf("division of 2 number are %d, %d ,%d\n", a, b, f = a / b);
        break;
    default:
        printf("enter correct values to calculate\n");
        break;
    }
    return 0;
}