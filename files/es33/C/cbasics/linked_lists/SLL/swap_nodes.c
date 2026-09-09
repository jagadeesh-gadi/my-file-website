#include <stdio.h>
#include <stdlib.h>

struct node
{
    int id;
    struct node *next;
};

int main()
{
    int n, i, pos1, pos2;
    int value;
    printf("enter how many nodes :: ");
    scanf("%d", &n);

    struct node *head = NULL;
    struct node *temp = NULL;
    struct node *new = NULL;
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
    // printing of the normal elements
    temp = head;
    while (temp != NULL)
    {
        printf("%d ->", temp->id);
        temp = temp->next;
    }
    printf("NULL\n");

    struct node *p1 = NULL;
    struct node *p2 = NULL;

    printf("enter first pos :: ");
    scanf("%d", &pos1);

    printf("enter second pos :: ");
    scanf("%d", &pos2);
    p1 = head;
    p2 = head;

    // chechking the positions
    for (i = 1; i < pos1; i++)
    {
        p1 = p1->next;
    }
    for (i = 1; i < pos2; i++)
    {
        p2 = p2->next;
    }
    value = p1->id;
    p1->id = p2->id;
    p2->id = value;

    // printing the swaped elements
    printf("after swap :: \n");
    temp = head;
    while (temp != NULL)
    {
        printf("%d ->", temp->id);
        temp = temp->next;
    }
    printf("NULL\n");

    // free (temp )
    temp = head;
    while (temp->next != NULL)
    {
        struct node *t = temp;
        temp = temp->next;
    }
    return 0;
}
