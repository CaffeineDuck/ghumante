import services


class SeedDB:
    def __init__(self):
        self.clinet = services.GoogleMapsSeederClient(
            "AIzaSyALPPxliHzQS49RaaQv9UQ4IOomsa-4L-s"
        )

        self.destionation_categories = {
            "temple": 1,
            "park": 2,
            "swimming pool": 3,
            "religous place": 4,
            "curch": 5,
        }

    def seed_hotels(self):
        self.client.find_and_save_images("hotels near kathmandu")
        self.client.find_and_save_images("hotels near pokhara")
        self.client.find_and_save_images("hotels near dang")
        self.client.find_and_save_images("hotels near jahapa")

    def seed_destionaitons(self):
        for i in self.destionation_categories:
            self.clinet.find_and_save_images(f"{i} near kathmandu")
            self.clinet.find_and_save_images(f"{i} near pokhara")
            self.clinet.find_and_save_images(f"{i} near dang")
            self.clinet.find_and_save_images(f"{i} near jahapa")


seeder = SeedDB()

if __name__ == "__main__":
    seeder.seed_destionaitons()
