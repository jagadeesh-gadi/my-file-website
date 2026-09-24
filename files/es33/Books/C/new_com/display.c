#include "display.h"

int insert_at_beg(struct node *head, struct node *new, struct node *temp)
{
    new = malloc(sizeof(struct node));

    if (new == NULL)
    {
        printf("memiry not allocted\n");
        return 1;
    }

    printf("enter value to insert at begi ::");
    scanf("%d", &new->id);
    new->next = head;
    head = new;
    display(head);
}
int insert_at_end(struct node *head, struct node *new, struct node *temp)
{
    new = malloc(sizeof(struct node));
    if (new == NULL)
    {
        printf("space not allocted \n");
        return 1;
    }
    printf("\nenter value to inset at end :: ");
    scanf("%d", &new->id);

    new->next = NULL;

    temp = head;
    while (temp->next != NULL)
    {
        temp = temp->next;
    }
    // printf("NULL");
    temp->next = new;

    display(head);
}

// insert at particular position
void insert_particular_position(struct node *head)
{
    struct node *temp;
    struct node *new = malloc(sizeof(struct node));
    int pos, i;
    printf("enter value to insert :: ");
    scanf("%d", &new->id);

    printf("enter position to insert :: ");
    scanf("%d", &pos);
    temp = head;
    for (i = 0; i < pos - 1; i++)
    {
        temp = temp->next;
    }
    new->next = temp->next;
    temp->next = new;
    display(head);
}

int delete_at_beg(struct node *head)
{
    struct node *temp;
    printf("delete at begin");

    if (head == NULL)
    {
        printf("list was empty \n");
        return 1;
    }

    temp = head;
    head = head->next;
    free(temp);

    display(head);
}

// delete at particular position
int delet_at_particluar(struct node *head)
{
    struct node *temp;
    struct node *posn;
    int pos, i;
    printf("enter pos to delete :: ");
    scanf("%d", &pos);

    temp = head;
    for (i = 1; i < pos - 1; i++)
    {
        temp = temp->next;
    }
    posn = temp->next;
    temp->next = posn->next;

    free(posn);
    display(head);
}

// display
int display(struct node *head)
{
    printf("\nLinked List: ");

    while (head != NULL)
    {
        printf("%d ->", head->id);
        head = head->next;
    }
    printf("NULL\n");
    printf("\n");
}
void print()
{
    printf("hello");
}
