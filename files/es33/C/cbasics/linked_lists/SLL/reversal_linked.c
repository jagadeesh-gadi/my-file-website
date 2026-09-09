#include <stdio.h>
#include <stdlib.h>
struct node
{
    int id;
    struct node *next;
};
int main()
{
    int n, i;
    printf("enter  num of nodes :: ");
    scanf("%d", &n);
    struct node *head = NULL;
    struct node *temp;
    struct node *prev = NULL;
    struct node *new;
    for (i = 0; i < n; i++)
    {
        new = malloc(sizeof(struct node));

        if (new == NULL)
        {
            printf("memory not allocated \n");
            return 1;
        }
        printf("enter nodes %d:", i + 1);
        scanf("%d", &new->id);

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

    temp = head;
    while (temp != NULL)
    {
        printf("%d ->", temp->id);
        temp = temp->next;
    }
    printf("NULL\n");
    //   reversal linked list
    struct node *next;
    temp = head;
    while (temp != NULL)
    {
        next = temp->next;
        temp->next = prev;
        prev = temp;
        temp = next;
    }
    head = prev;
    printf("after reverasl :: \n");
    temp = head;
    while (temp != NULL)
    {
        printf("%d ->", temp->id);
        temp = temp->next;
    }
    printf("NULL\n");
    temp = head;
    while (temp->next != NULL)
    {
        struct node *t = temp;
        temp = temp->next;
        free(t);
    }

    return 0;
}