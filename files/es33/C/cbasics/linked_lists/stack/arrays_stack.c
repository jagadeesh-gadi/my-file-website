#include <stdio.h>
#include <stdlib.h>
#define size 5

int data[size];
int top = -1;

void push()
{

    int value;
    if (top == size - 1)
    {
        printf("stack overflow");
        return;
    }
    printf("enter value to push :: ");
    scanf("%d", &value);

    top++;
    data[top] = value;
}
void pop()
{
    if (top == -1)
    {
        printf("stack underflow\n");
        return;
    }
    printf("delete data :: %d", data[top]);
    top--;
    printf("\n");
}
void display()
{
    int i;
    if (top == -1)
    {
        printf("stack was empty\n");
        return;
    }
    for (i = top; i >= 0; i--)
    {
        printf(" %d ", data[i]);
    }
    printf("\n");
}
int main()
{

    int choice;
    while (1)
    {
        printf("1.PUSH\n");
        printf("2.POP\n");
        printf("3.DISPLAY\n");
        printf("4.EXIT\n");

        printf("\n");
        printf("enter your choice :: ");
        scanf("%d", &choice);

        switch (choice)
        {
        case 1:
            push();
            break;
        case 2:
            pop();
            break;
        case 3:
            display();
            break;
        case 4:
            exit(1);
            break;

        default:
            printf("invalid input");
            break;
        }
    }
    return 0;
}