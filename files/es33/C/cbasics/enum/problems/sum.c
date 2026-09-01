#include <stdio.h>

typedef enum
{
    ADD = 1,
    SUBTRACT,
    MULTI,
    DIVISION

} state_t;
int main()
{
    state_t s;
    int choice;
    float a, b, c;
    printf("enter a and b values :: ");
    scanf("%f %f", &a, &b);
    printf("MENU\n");
    printf("1.ADD\n");
    printf("2.SUB\n");
    printf("3.MULT\n");
    printf("4.DIVISION\n");

    printf("enter the choice :: \n");
    scanf("%d", &choice);

    // exception handling
    if (choice < ADD || choice > DIVISION)
    {
        printf("select correct enum values\n");
        return 1;
    }
    s = choice;
    // switch case after entering
    switch (s)
    {
    case ADD:
        c = a + b;
        printf("addition :: %f\n", c);
        break;
    case SUBTRACT:
        c = a - b;
        printf("sub :: %f\n", c);
        break;
    case MULTI:
        c = a * b;
        printf("MUL:: %f\n", c);
        break;
    case DIVISION:
        c = a / b;
        printf("DIVISION :: %f\n", c);
        break;

    default:
        printf("ENTER CORRECT OPTION \n");
        break;
    }
    return 0;
}