#include <stdio.h>
void even()
{
    printf("even number\n");
}
void odd()
{
    printf("odd number\n");
}

void (*find(int n))()

{
    if (n % 2 == 0)
    {
        return even;
        // printf("%p\n", (void *)n);
    }
    else
    {
        return odd;
        // printf("%p\n", (void *)n);
    }
}

int main()
{
    int n;
    scanf("%d", &n);

    void (*fp)();
    fp = find(n);
    fp();
    printf("Address of selected function: %p\n", (void *)fp);

    return 0;
    return 0;
}