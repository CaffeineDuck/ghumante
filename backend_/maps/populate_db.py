import services


class SeedDB:
    def __init__(self):
        self.clinet = services.GoogleMapsSeederClient(
            "AIzaSyALPPxliHzQS49RaaQv9UQ4IOomsa-4L-s"
        )

        self.destionation_categories = {
            "temple": 1,
            "park": 3,
            "swimming pool": 4,
            "religous place": 5,
            "curch": 6,
            " Trekking and Hiking": 7,
        }

    def seed_hotels(self):
        self.client.find_and_save_images("hotels near kathmandu")
        self.client.find_and_save_images("hotels near pokhara")
        self.client.find_and_save_images("hotels near dang")
        self.client.find_and_save_images("hotels near jahapa")

    def seed_destionaitons(self):
        for i, value in self.destionation_categories.items():
            self.clinet.find_and_save_images(f"{i} near kathmandu", value)
            self.clinet.find_and_save_images(f"{i} near pokhara", value)


seeder = SeedDB()

if __name__ == "__main__":
    seeder.seed_destionaitons()
