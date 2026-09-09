#include <stdio.h>
#include <stdlib.h>

struct node
{
  int id;
  char c;
  struct node *pt;
};

int main()
{

  int n, i;
  scanf("%d", &n);
  struct node n1;
  struct node *p = malloc(n * sizeof(n1));
  if (p == NULL)
  {
    printf("some values\n ");
    return 1;
  }
  for (i = 0; i < n; i++)
  {
    p[i].id = i + 1;
    p[i].c = 'A' + i;
    if (i < n - 1)
    {
      p[i].pt = &p[i + 1];
    }
    else
    {
      p[i].pt = NULL;
    }
  }
  // struct node *q = p;

  while (p != NULL)
  {
    printf("id = %d || char = %c \n", p->id, p->c);
    p = p->pt;
  }

  free(p);
  return 0;
}
