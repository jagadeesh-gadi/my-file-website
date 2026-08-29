#include <stdio.h>
#include <stdlib.h>

void heap_overflow()
{
    printf("\n--- HEAP BUFFER OVERFLOW ---\n");

    int *p = malloc(5 * sizeof(int));

    if (p == NULL)
        return;

    for (int i = 0; i <= 5; i++)
    {
        p[i] = i * 10;
    }

    free(p);
}

void use_after_free()
{
    printf("\n--- USE AFTER FREE ---\n");

    int *p = malloc(sizeof(int));

    if (p == NULL)
        return;

    *p = 100;

    printf("Before free = %d\n", *p);

    free(p);

    /* ERROR */
    printf("After free = %d\n", *p);
}

void double_free()
{
    printf("\n--- DOUBLE FREE ---\n");

    int *p = malloc(5 * sizeof(int));

    if (p == NULL)
        return;

    p[0] = 100;

    free(p);

    /* ERROR */
    free(p);
}

void memory_leak()
{
    printf("\n--- MEMORY LEAK ---\n");

    int *p = malloc(10 * sizeof(int));

    if (p == NULL)
        return;

    p[0] = 100;

    /* ERROR:
       free(p) is intentionally missing
    */
}

int main()
{
    int choice;

    printf("1. Heap Buffer Overflow\n");
    printf("2. Use After Free\n");
    printf("3. Double Free\n");
    printf("4. Memory Leak\n");

    printf("Enter choice: ");
    scanf("%d", &choice);

    switch (choice)
    {
        case 1:
            heap_overflow();
            break;

        case 2:
            use_after_free();
            break;

        case 3:
            double_free();
            break;

        case 4:
            memory_leak();
            break;

        default:
            printf("Invalid choice\n");
    }

    return 0;
}
