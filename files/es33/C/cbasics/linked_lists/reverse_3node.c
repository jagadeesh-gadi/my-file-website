
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

struct node *create(struct node *head, int n)
{
    struct node *new, *temp;
    int i;
    for (i = 0; i < n; i++)
    {
        new = malloc(sizeof(struct node));

        if (new == NULL)
        {
            printf("memory not allocated \n");
            return head;
        }
        printf("enter nodes %d:", i + 1);
        scanf("%d", &new->data);

        new->next = NULL;
        if (head == NULL)
        {
            head = new;
            temp = new;
        }
        else
        {
            temp->next = new;
            temp = new;
        }
    }
    return head;
}

struct node *reverse(struct node *head)
{
    struct node *prev = NULL;
    struct node *current = head;
    struct node *next = NULL;

    while (current != NULL)
    {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

void display(struct node *head)
{
    struct node *temp = head;

    while (temp != NULL)
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }

    printf("NULL\n");
}

void delete_second(struct node *head)
{
    struct node *temp;

    if (head == NULL || head->next == NULL)
    {
        printf("Second node does not exist\n");
        return;
    }

    temp = head;

    struct node *del = temp->next;

    temp->next = del->next;

    free(del);
}

int main()
{
    struct node *head = NULL;
    int n;

    printf("Enter number of nodes: ");
    scanf("%d", &n);

    head = create(head, n);

    printf("Before reverse:\n");
    display(head);

    head = reverse(head);

    printf("After reverse:\n");
    display(head);

    printf("delete of 2nd node ::: \n");
    delete_second(head);
    display(head);

    return 0;
}
