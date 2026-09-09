#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *top = NULL;
int count = 0;
void push()
{
    int value;
    struct node *new = malloc(sizeof(struct node));
    if (new == NULL)
    {
        printf("stack overflow");
        return;
    }
    printf("Enter value: ");
    scanf("%d", &value);
    new->data = value;
    new->next = top;
    top = new;
    count++;
}
int pop()
{

    struct node *temp;
    if (temp == NULL)
    {
        printf("stack underflow\n");
        return -1;
    }
    temp = top;
    printf("Deleted: %d\n", temp->data);
    top = top->next;
    free(temp);
    count--;
}
void display()
{
    struct node *temp = top;

    if (temp == NULL)
    {
        printf("memory not allocated \n");
        return;
    }

    while (temp != NULL)
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NUll\n");
}
void peek()
{
    if (top == NULL)
    {
        printf("stack  was empty");
        return;
    }
    printf("top value :: %d\n", top->data);
}

int main()
{
    int choice;

    while (1)
    {
        printf("\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Display\n");
        printf("4. peek\n");
        printf("5. Exit\n");

        printf("Enter choice: ");
        scanf("%d", &choice);

        printf("\n");
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
            peek();
            break;

        case 5:
            return 0;

        default:
            printf("Invalid choice\n");
        }
    }
}

// #include <stdio.h>
// #include <stdlib.h>

// struct node
// {
//     int data;
//     struct node *next;
// };

// struct node *top = NULL;

// void push()
// {
//     int value;

//     struct node *new;

//     new = malloc(sizeof(struct node));

//     if (new == NULL)
//     {
//         printf("Memory not allocated\n");
//         return;
//     }

//     printf("Enter value: ");
//     scanf("%d", &value);

//     new->data = value;
//     new->next = top;
//     top = new;
// }

// void pop()
// {
//     struct node *temp;

//     if (top == NULL)
//     {
//         printf("Stack Underflow\n");
//         return;
//     }

//     temp = top;

//     printf("Deleted: %d\n", temp->data);

//     top = top->next;

//     free(temp);
// }

// void display()
// {
//     struct node *temp;

//     if (top == NULL)
//     {
//         printf("Stack is empty\n");
//         return;
//     }

//     temp = top;

//     while (temp != NULL)
//     {
//         printf("%d\n", temp->data);
//         temp = temp->next;
//     }
// }

// int main()
// {
// }