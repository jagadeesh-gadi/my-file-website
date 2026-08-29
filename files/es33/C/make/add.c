#include <stdio.h>

#define BONUS 1000

int salary = 20000;

void displaySalary()
{
    int total;

    total = salary + BONUS;

    printf("Basic Salary = %d\n", salary);
    printf("Bonus = %d\n", BONUS);
    printf("Total Salary = %d\n", total);
}

int main()
{
    displaySalary();
    return 0;
}
