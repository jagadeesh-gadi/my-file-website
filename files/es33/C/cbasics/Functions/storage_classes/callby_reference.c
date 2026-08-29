#include <stdio.h>
#include <stdlib.h>

void add(int *a, int *b, int *result)
{
    *result = *a + *b;
}

void sub(int *a, int *b, int *result)
{
    *result = *a - *b;
}

void mult(int *a, int *b, int *result)
{
    *result = (*a) * (*b);
}

void divide(int *a, int *b, int *result)
{
    *result = (*a) / (*b);
}

void mod(int *a, int *b, int *result)
{
    *result = (*a) % (*b);
}

void menu()
{
    printf("\n========== MENU ==========\n");
    printf("1. Addition\n");
    printf("2. Subtraction\n");
    printf("3. Multiplication\n");
    printf("4. Division\n");
    printf("5. Modulus\n");
    printf("6. Exit\n");
}

void cases(int ch, int *x, int *y, int *result)
{
    switch (ch)
    {
    case 1:
        add(x, y, result);
        printf("Addition = %d\n", *result);
        break;

    case 2:
        sub(x, y, result);
        printf("Subtraction = %d\n", *result);
        break;

    case 3:
        mult(x, y, result);
        printf("Multiplication = %d\n", *result);
        break;

    case 4:
        if (*y == 0)
        {
            printf("not allowed the zeroes\n ");
        }
        else
        {
            divide(x, y, result);
            printf("Division = %d\n", *result);
            break;
        }

    case 5:
        if (*y == 0)
        {
            printf("not allowed zeroes\n");
        }
        else
        {
            mod(x, y, result);
            printf("Modulus = %d\n", *result);
            break;
        }
    case 6:
        printf("Exiting the program...\n");
        exit(0);
    default:
        printf("Invalid choice! Please enter a number between 1 and 6.\n");
        break;
    }
}

int main()
{
    int x, y;
    int result;
    int choice;

    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);

    while (1)
    {
        menu();

        printf("Enter your choice: ");
        scanf("%d", &choice);

        cases(choice, &x, &y, &result);
    }

    return 0;
}