#include <stdio.h>
#include <stdlib.h>
#define SIZE 5
int queue[SIZE];
int front = -1;
int raer = -1;
int isempty()
{
    return (front == -1);
}
int isfull()
{
    return (raer == SIZE - 1);
}
void display()
{
    int i;
    if (isempty())
    {
        printf("under flow");
        return;
    }
    printf("queue ::");

    for (i = front; i <= raer; i++)
    {
        printf("%d ", queue[i]);
    }
    printf("\n");
}

void enqueue()
{
    int data;

    if (isfull())
    {
        printf("queue is full\n");
        return;
    }
    printf("enter data ::: ");
    scanf("%d", &data);
    if (front == -1)
    {
        front = 0;
    }
    raer++;
    queue[raer] = data;
    printf("%d inserted ", data);
}
int dequeue()
{
    int data;
    if (isempty())
    {
        printf("queue is underflow\n");
        return -1;
    }
    data = queue[front];
    front++;
    if (front > raer)
    {
        front = -1;
        raer = -1;
    }
    printf("%d deleted\n", data);
    return data;
}

int main()
{

    while (1)
    {

        printf("\n");
        printf("==== SELECT MENU =====\n");
        printf("1.ENGUEUE\n");
        printf("2.DEQUEUE\n");
        printf("3.DISPLAY\n");
        printf("4.EXIT\n");

        int choice;
        printf("enter choice :: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            enqueue();
            break;
        case 2:
            dequeue();
            break;
        case 3:
            display();
            break;
        case 4:
            exit(1);
            break;

        default:
            printf("invalid choice ::\n");
            break;
        }
        printf("\n");
    }

    return 0;
}