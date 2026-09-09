#include <stdio.h>
#include <stdlib.h>
struct node
{
    int id;
    struct node *prev;
    struct node *next;
};
#include "circular_list.h"
int main()
{
    int n, i;
    printf("enter no of nodes:: ");
    scanf("%d", &n);

    struct node *temp = NULL;
    struct node *new = NULL;
    struct node *head = NULL;

    for (i = 0; i < n; i++)
    {
        new = malloc(sizeof(struct node));
        if (new == NULL)
        {
            printf("memory not allocated \n");
            return 1;
        }
        printf("enter the nodes data %d ::", i + 1);
        scanf("%d", &new->id);
        new->next = NULL;
        new->prev = NULL;

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
        temp->next = head;
        circular_list(head);
    }

    return 0;
}