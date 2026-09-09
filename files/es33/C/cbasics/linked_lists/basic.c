#include <stdio.h>
struct node
{
    int data;
    struct node *next;
};
int main()
{
    struct node s = {10, NULL};
    struct node s1 = {20, NULL};
    struct node s2 = {30, NULL};
    struct node s3 = {40, NULL};

    s.next = &s1;

    s1.next = &s2;

    s2.next = &s3;

    s3.next = NULL;

    printf("data :: %d", s.data);
    printf("-> %d", s.next->data);
    printf("-> %d", s1.next->data);
    printf("-> %d\n", s2.next->data);
    // printf("-> %d", s3.next->data);

    return 0;
}