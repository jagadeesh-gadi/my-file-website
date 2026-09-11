#include <stdio.h>
#include <stdlib.h>
#define size 5
struct node
{
    int id;
    int priority;
};
struct node queue[size];
int rear = -1;
int isempty()
{
    return (rear == -1);
}
int isfull()
{
    return (rear == size - 1);
}
void enqueue()
{
    int data, priority;
    if (isfull())
    {
        printf("queue overflow\n");
        return;
    }

    printf("enter value ::");
    scanf("%d", &data);
    printf("enter priority :: ");
    scanf("%d", &priority);
    rear++;

    queue[rear].id = data;
    queue[rear].priority = priority;
    printf("%d inserted ", data);
}

int highest_priority()
{
    int pos = 0, i;
    for (i = 1; i <= rear; i++)
    {
        if (queue[i].priority < queue[pos].priority)
        {
            pos = i;
        }
    }
    return pos;
}

void dequeue()
{
    int pos, i, data;
    if (isempty())
    {
        printf("queue is underflow");
        return;
    }
    pos = highest_priority();
    data = queue[pos].id;
    for (i = pos; i <= rear; i++)
    {
        queue[i] = queue[i + 1];
    }
    rear--;
    printf("%d deleted ", data);
}

void display()
{
    int i;
    if (isempty())
    {
        printf("under flow");
        return;
    }
    printf("\n ====== queue =====\n");

    for (i = 0; i <= rear; i++)
    {
        printf("%d inserted at priority :: %d\n", queue[i].id, queue[i].priority);
    }
    printf("\n");
}

int main()
{
    int choice;
    while (1)
    {
        printf("\n");
        printf("\n===== PRIORITY QUEUE =====\n");
        printf("1. ENQUEUE\n");
        printf("2. DEQUEUE\n");
        printf("3. PEEK\n");
        printf("4. DISPLAY\n");
        printf("5. EXIT\n");
        printf("Enter choice: ");
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
            // peek();
            break;
        case 4:
            display();
            break;
        case 5:
            exit(1);
        default:
            printf("Invalid choice\n");
        }
        printf("\n");
    }
    return 0;
}