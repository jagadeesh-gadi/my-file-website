
#include <stdio.h>
#include <stdlib.h>
struct node
{
    int id;
    // int dat;
    // char c;
    struct node *next;
};

int insert_at_beg(struct node *head, struct node *new, struct node *temp);

int insert_at_end(struct node *head, struct node *new, struct node *temp);

// insert at particular position
void insert_particular_position(struct node *head);

int delete_at_beg(struct node *head);

// delete at particular position
int delet_at_particluar(struct node *head);

// display
int display(struct node *head);

void print(void);